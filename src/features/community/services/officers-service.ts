import type { Officer, CommitteeMember } from '@/features/community/types';

// Static data import (fallback)
import staticOfficers from '@/features/community/data/officers.json';

// Environment variables
const CORE_API_URL = process.env.CORE_API_URL;
const CORE_API_KEY = process.env.CORE_API_KEY;

// Committee ID to full name mapping
const COMMITTEE_NAMES: Record<string, string> = {
  CORE: 'Core',
  ACADS: 'Academics',
  CORPREL: 'Corporate Relations',
  DOCULOGI: 'Documentation and Logistics',
  FIN: 'Finance',
  HRD: 'Human Resource Development',
  MEM: 'La Salle Computer Society',
  PUBLI: 'Publications',
  PUBS: 'Publicity',
  RND: 'Research and Development',
  SOCIOCIVIC: 'Socio-Civic',
  TND: 'Training and Development',
  UNIVREL: 'University Relations',
};

function getCommitteeFullName(committeeId: string): string {
  return COMMITTEE_NAMES[committeeId] || committeeId;
}

// Position ID to full name mapping
const POSITION_NAMES: Record<string, string> = {
  PRES: 'President',
  EVP: 'Executive Vice President',
  VP: 'Vice President',
  AVP: 'Assistant Vice President',
};

export function getPositionFullName(positionId: string): string {
  return POSITION_NAMES[positionId] || positionId;
}

interface CoreApiMember {
  id: number;
  full_name: string;
  image_url: string;
  position_id: string;
  committee_id: string;
  [key: string]: unknown;
}

/**
 * Fetch officers from core API with hierarchical structure:
 * - President: EVP with CORE committee
 * - VPs: All members with VP position
 * - AVPs: Fetched per committee for each VP
 */
export async function getOfficers(): Promise<Officer[]> {
  if (!CORE_API_URL || !CORE_API_KEY) {
    console.warn('CORE_API_URL or CORE_API_KEY not configured, using static data');
    return staticOfficers as Officer[];
  }

  try {
    // Fetch President (EVP + CORE committee)
    const presidentResponse = await fetch(
      `${CORE_API_URL}/members?position=EVP,PRES&committee=CORE`,
      {
        headers: { Authorization: `Bearer ${CORE_API_KEY}` },
        next: { revalidate: 3600 },
      }
    );

    // Fetch all VPs
    const vpResponse = await fetch(`${CORE_API_URL}/members?position=VP`, {
      headers: { Authorization: `Bearer ${CORE_API_KEY}` },
      next: { revalidate: 3600 },
    });

    if (!presidentResponse.ok || !vpResponse.ok) {
      throw new Error('Failed to fetch officers from core API');
    }

    const presidentData: CoreApiMember[] = await presidentResponse.json();
    const vpData: CoreApiMember[] = await vpResponse.json();

    // Map President (find PRES position in CORE committee)
    const presidentMember = presidentData.find((m) => m.position_id === 'PRES');
    const evpMembers = presidentData.filter((m) => m.position_id === 'EVP');

    const president: Officer | null = presidentMember
      ? {
          id: presidentMember.id,
          name: presidentMember.full_name,
          image: presidentMember.image_url || '/images/placeholder.jpg',
          position: 'President',
          committee: 'Executive Core',
          committeeId: 'CORE',
          committeeMembers: [], // No hover for President
        }
      : null;

    // Map EVPs as separate officers (no hover)
    const evps: Officer[] = evpMembers.map((member) => ({
      id: member.id,
      name: member.full_name,
      image: member.image_url || '/images/placeholder.jpg',
      position: 'EVP',
      committee: 'Executive Core',
      committeeId: 'CORE',
      committeeMembers: [], // No hover for EVPs
    }));

    // Map VPs with their committee information
    const vps: Officer[] = vpData.map((member) => ({
      id: member.id,
      name: member.full_name,
      image: member.image_url || '/images/placeholder.jpg',
      position: 'VP',
      committee: getCommitteeFullName(member.committee_id),
      committeeId: member.committee_id,
      committeeMembers: [],
    }));

    // Fetch AVP members for each VP's committee
    for (const vp of vps) {
      if (vp.committeeId) {
        try {
          const avpResponse = await fetch(
            `${CORE_API_URL}/members?position=AVP&committee=${vp.committeeId}`,
            {
              headers: { Authorization: `Bearer ${CORE_API_KEY}` },
              next: { revalidate: 3600 },
            }
          );

          if (avpResponse.ok) {
            const avpData: CoreApiMember[] = await avpResponse.json();
            vp.committeeMembers = avpData.map((m) => ({
              name: m.full_name,
              position: getPositionFullName('AVP'),
            }));
          }
        } catch (error) {
          console.error(`Error fetching AVPs for ${vp.committeeId}:`, error);
        }
      }
    }

    // Return: President, then EVPs, then VPs
    return [...(president ? [president] : []), ...evps, ...vps];
  } catch (error) {
    console.error('Error fetching officers:', error);
    return staticOfficers as Officer[];
  }
}
