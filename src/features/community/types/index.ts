// Officer types (matching core API structure for future integration)
export interface CommitteeMember {
  name: string;
  position: string;
}

export interface Officer {
  id: number;
  name: string;
  image: string;
  position: string;
  committee: string;
  committeeMembers?: CommitteeMember[];
}

// Core API response type (for future API integration)
// Endpoint: CORE_API_URL (with Bearer token auth)
export interface CoreApiMember {
  id: number;
  full_name: string;
  nickname: string;
  email: string;
  telegram: string;
  position_id: string;
  committee_id: string;
  college: string;
  program: string;
  discord: string;
  interests: string;
  contact_number: string;
  fb_link: string;
  image_url: string;
  house_name: string;
}

// Testimonial types (matching API response structure)
export interface TestimonialImage {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailURL: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
}

export interface Testimonial {
  id: number;
  name: string;
  testimony: string;
  image: TestimonialImage;
  'id-number': string;
  position: string;
  committee: string;
  updatedAt: string;
  createdAt: string;
}

export interface TestimonialResponse {
  docs: Testimonial[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}
