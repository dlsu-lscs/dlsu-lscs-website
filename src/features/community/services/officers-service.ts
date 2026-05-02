import type { Officer, CommitteeMember } from '@/features/community/types';

// Static data import (fallback)
import staticOfficers from '@/features/community/data/officers.json';

// Environment variables
const CORE_API_URL = process.env.CORE_API_URL;
const CORE_API_KEY = process.env.CORE_API_KEY;

interface CoreApiMember {
  id: number;
  full_name: string;
  image_url: string;
  position_id: string;
  committee_id: string;
  [key: string]: unknown;
}

/**
 * Fetch officers from core API with dynamic queries
 * Queries:
 * - /members?position=VP (all VPs)
 * - /members?position=EVP&committee=CORE (Executive Core)
 * - /members?position=AVP,CT&committee=RND (committee members for RND)
 */
export async function getOfficers(): Promise<Officer[]> {
  // Fallback to static data if env vars not configured
  if (!CORE_API_URL || !CORE_API_KEY) {
    console.warn('CORE_API_URL or CORE_API_KEY not configured, using static data');
    return staticOfficers as Officer[];
  }

  try {
    // Fetch Executive Core (EVP with CORE committee)
    const coreResponse = await fetch(`${CORE_API_URL}/members?position=EVP&committee=CORE`, {
      headers: {
        Authorization: `Bearer ${CORE_API_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    // Fetch all VPs
    const vpResponse = await fetch(`${CORE_API_URL}/members?position=VP`, {
      headers: {
        Authorization: `Bearer ${CORE_API_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!coreResponse.ok || !vpResponse.ok) {
      throw new Error('Failed to fetch officers from core API');
    }

    const coreData: CoreApiMember[] = await coreResponse.json();
    const vpData: CoreApiMember[] = await vpResponse.json();

    // Combine and map to Officer type
    const allOfficers: Officer[] = [
      // Map Executive Core
      ...coreData.map((member) => ({
        id: member.id,
        name: member.full_name,
        image: member.image_url || '/images/placeholder.jpg',
        position: 'Executive Core',
        committee: 'Executive Core',
        committeeMembers: [], // Will be populated below
      })),
      // Map VPs
      ...vpData.map((member) => ({
        id: member.id,
        name: member.full_name,
        image: member.image_url || '/images/placeholder.jpg',
        position: `VP for ${member.committee_id}`,
        committee: member.committee_id,
        committeeMembers: [], // Will be populated below
      })),
    ];

    // Fetch committee members for each VP's committee
    for (const officer of allOfficers) {
      if (officer.committee && officer.committee !== 'Executive Core') {
        try {
          const committeeResponse = await fetch(
            `${CORE_API_URL}/members?committee=${officer.committee}`,
            {
              headers: {
                Authorization: `Bearer ${CORE_API_KEY}`,
              },
              next: { revalidate: 3600 }, // Cache for 1 hour
            }
          );

          if (committeeResponse.ok) {
            const committeeData: CoreApiMember[] = await committeeResponse.json();
            officer.committeeMembers = committeeData
              .filter((m) => m.position_id !== 'VP') // Exclude the VP themselves
              .map((m) => ({
                name: m.full_name,
                position: m.position_id,
              }));
          }
        } catch (error) {
          console.error(`Error fetching committee members for ${officer.committee}:`, error);
        }
      }
    }

    return allOfficers;
  } catch (error) {
    console.error('Error fetching officers:', error);
    return staticOfficers as Officer[];
  }
}
