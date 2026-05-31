'use client';

import { FaDiscord, FaEnvelope, FaTelegram } from 'react-icons/fa';
import * as React from 'react';
import Image from 'next/image';
import { Officer, CommitteeMember } from '@/features/community/types';
import { PiHandTap } from 'react-icons/pi';

function getTelegramLink(telegram: string): string | null {
  const handle = telegram.trim();

  if (!handle) {
    return null;
  }

  if (handle.startsWith('http://') || handle.startsWith('https://')) {
    return handle;
  }

  return `https://t.me/${handle.replace(/^@/, '')}`;
}

function getEmailLink(email?: string | null): string | null {
  const address = email?.trim();

  if (!address) {
    return null;
  }

  return `mailto:${address}`;
}

// Position ID to full name mapping
const POSITION_NAMES: Record<string, string> = {
  PRES: 'President',
  EVP: 'Executive Vice President',
  VP: 'Vice President',
  AVP: 'Associate Vice President',
};

function getFullPositionName(position: string): string {
  return POSITION_NAMES[position] || position;
}

interface OfficerCardProps {
  officer: Officer;
  isPresident?: boolean;
  isCycling?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

function OfficerCard({
  officer,
  isPresident = false,
  isCycling = false,
  currentIndex = 0,
  totalCount = 1,
}: OfficerCardProps) {
  const [showCommittee, setShowCommittee] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger fade when officer changes
  React.useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true);
      const fadeTimer = setTimeout(() => setIsTransitioning(false), 250);
    }, 0);
    return () => clearTimeout(transitionTimer);
  }, [officer.id]);

  const handleMouseEnter = () => {
    if (!isMobile && officer.committeeMembers && officer.committeeMembers.length > 0) {
      setShowCommittee(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowCommittee(false);
    }
  };

  const handleClick = () => {
    if (isMobile && officer.committeeMembers && officer.committeeMembers.length > 0) {
      setShowCommittee(!showCommittee);
    }
  };

  const imageHeight = isPresident ? 'h-0' : 'h-36';
  const telegramLink = getTelegramLink(officer.telegram);
  const emailLink = getEmailLink(officer.email);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl aspect-13/16 bg-[#1A5D89]
        shadow-md transition-all duration-300 ease-in-out border-10 border-[#1A5D89] ${
          showCommittee
            ? 'scale-105 shadow-xl shadow-[#1A5D89]/40'
            : 'hover:shadow-lg hover:shadow-[#1A5D89]/30 hover:-translate-y-1'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`transition-opacity flex flex-col items-center justify-center h-full duration-300 ${showCommittee ? 'opacity-0' : 'opacity-100'}`}
      >
        <div
          className={`relative flex-1 w-full ${imageHeight} transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <Image
            src={officer.image || '/images/placeholder-profile.png'}
            alt={officer.name}
            fill
            className="object-cover rounded-lg"
          />
          {isMobile &&
            officer.position === 'VP' &&
            officer.committeeMembers &&
            officer.committeeMembers.length > 0 && (
              <div className="absolute right-2 top-2 animate-pulse">
                <span className="rounded-full text-base text-blue-400">
                  <PiHandTap />
                </span>
              </div>
            )}
          <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-linear-to-t from-black/90 via-black/60 to-transparent px-3 pb-3 pt-8">
            <div
              className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              <h4 className="text-xl font-bold text-white drop-shadow-lg">{officer.name}</h4>
              <p className="font-semibold text-white/90 drop-shadow-lg">
                {getFullPositionName(officer.position)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {telegramLink && (
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
                  >
                    <FaTelegram />
                    {officer.telegram}
                  </a>
                )}

                {officer.discord && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    <FaDiscord />
                    {officer.discord}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Committee label bar */}
        <div
          className="h-14 mt-2 bg-white rounded-lg w-full flex items-center inset-shadow-sm
            justify-center text-base font-bold uppercase
            transition-transform duration-300 group-hover:scale-[1.02]"
        >
          <span
            className="bg-linear-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)]
            bg-clip-text text-transparent"
          >
            <h3 className="text-center">{officer.committee}</h3>
          </span>
        </div>

        {isCycling && totalCount > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: totalCount }).map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ease-in-out ${
                  i === currentIndex ? 'h-2 w-6 bg-[rgba(221,181,24,0.9)]' : 'h-2 w-2 bg-gray-400'
                } rounded-full`}
              />
            ))}
          </div>
        )}
      </div>

      {officer.committeeMembers && officer.committeeMembers.length > 0 && (
        <div
          className={`absolute inset-0 bg-white p-4 transition-opacity duration-300 rounded-lg
            bg-linear-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] text-white 
            flex flex-col ${showCommittee ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <h4 className="mb-4 text-xl font-bold text-center drop-shadow-sm">{officer.committee}</h4>
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
          >
            {officer.committeeMembers.map((member: CommitteeMember, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-md bg-black/15 p-2 backdrop-blur-xs border border-white/10
                  transition-colors duration-200 hover:bg-black/25"
              >
                <span className="text-[11px] uppercase tracking-wider text-white/90 font-medium text-center mb-0.5">
                  {member.position}
                </span>
                <span className="text-sm font-bold text-white text-center drop-shadow-sm">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(OfficerCard);
