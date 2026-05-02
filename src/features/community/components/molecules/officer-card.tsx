'use client';

import * as React from 'react';
import { Officer, CommitteeMember } from '@/features/community/types';

interface OfficerCardProps {
  officer: Officer;
}

export default function OfficerCard({ officer }: OfficerCardProps) {
  const [showCommittee, setShowCommittee] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile && officer.committeeMembers) {
      setShowCommittee(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowCommittee(false);
    }
  };

  const handleClick = () => {
    if (isMobile && officer.committeeMembers) {
      setShowCommittee(!showCommittee);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`transition-opacity duration-300 ${showCommittee ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative h-48 w-full">
          <img
            src={officer.image}
            alt={officer.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
          {isMobile && officer.committeeMembers && (
            <div className="absolute right-2 top-2 animate-pulse">
              <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">Tap</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{officer.name}</h3>
          <p className="text-sm text-gray-600">{officer.committee}</p>
        </div>
      </div>

      {officer.committeeMembers && (
        <div
          className={`absolute inset-0 bg-white p-4 transition-opacity duration-300 ${
            showCommittee ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h4 className="mb-2 text-sm font-semibold text-gray-700">Committee Members</h4>
          <div className="max-h-40 overflow-y-auto">
            {officer.committeeMembers.map((member: CommitteeMember, index: number) => (
              <div key={index} className="mb-2 border-b pb-2 last:border-b-0">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-gray-500">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
