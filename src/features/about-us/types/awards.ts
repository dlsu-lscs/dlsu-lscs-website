export interface CmsAward {
  id: number;
  awardName: string;
  year: number;
  projectName: string;
  rank: string;
  updatedAt: string;
  createdAt: string;
}

// Legacy type for backward compatibility
export type awards = {
  standing?: string;
  awardCommmittee?: string;
  awardName?: string;
  awardType?: string;
  academicYear?: string;
};
