import type { TestimonialResponse } from '@/features/community/types';

// Static data import (fallback)
import staticTestimonials from '@/features/community/data/testimonials.json';

// Environment variables
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY; // Server-side only, no NEXT_PUBLIC_ prefix

/**
 * Fetch testimonials from CMS API
 * Endpoint: https://cms.app.dlsu-lscs.org/api/lscs-testimony?limit=0
 * Auth: Authorization: users API-Key {API_KEY}
 */
export async function getTestimonials(): Promise<TestimonialResponse> {
  // Fallback to static data if env vars not configured
  if (!NEXT_PUBLIC_API_URL || !API_KEY) {
    console.warn('NEXT_PUBLIC_API_URL or API_KEY not configured, using static data');
    return staticTestimonials as TestimonialResponse;
  }

  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/lscs-testimony?limit=0`, {
      headers: {
        Authorization: `users API-Key ${API_KEY}`,
      },
      // Cache for 1 hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return staticTestimonials as TestimonialResponse;
  }
}
