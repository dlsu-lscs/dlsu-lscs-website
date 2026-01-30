export interface CmsImage {
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

export interface CmsPartner {
  id: number;
  name: string;
  image: CmsImage;
  updatedAt: string;
  createdAt: string;
}

// Legacy type for backward compatibility
export type partners = {
  name: string;
  logo: string;
  link?: string;
};
