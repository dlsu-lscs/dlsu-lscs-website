import { LscsArticle } from '@/features/articles/types';

export function createOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'La Salle Computer Society',
    alternateName: 'LSCS',
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description:
      "La Salle Computer Society (LSCS) is DLSU's largest and pioneering technological organization and the home organization of the College of Computer Studies.",
    foundingDate: '1982',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2401 Taft Avenue',
      addressLocality: 'Manila',
      addressRegion: 'Metro Manila',
      postalCode: '1004',
      addressCountry: 'PH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'lscs@dlsu.edu.ph',
    },
    sameAs: [
      'https://www.facebook.com/LaSalleComputerSociety',
      'https://www.instagram.com/dlsu_lscs/',
      'https://www.linkedin.com/company/la-salle-computer-society/',
      'https://www.tiktok.com/@dlsu_lscs',
    ],
  };
}

export function createWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'La Salle Computer Society',
    url: baseUrl,
    description:
      "Official website of La Salle Computer Society - DLSU's largest technological organization",
    publisher: {
      '@type': 'Organization',
      name: 'La Salle Computer Society',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/press-release?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function createArticleSchema(article: LscsArticle) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const articleUrl = `${baseUrl}/article/${article.slug}`;

  const featuredImage =
    typeof article.featuredImage === 'object' && article.featuredImage?.url
      ? article.featuredImage.url
      : `${baseUrl}/icon.svg`;

  const author =
    typeof article.author === 'object'
      ? {
          '@type': 'Person',
          name: article.author.name,
        }
      : {
          '@type': 'Organization',
          name: 'La Salle Computer Society',
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle || `Read ${article.title} on LSCS`,
    image: featuredImage,
    url: articleUrl,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: author,
    publisher: {
      '@type': 'Organization',
      name: 'La Salle Computer Society',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    ...(article.tags && {
      keywords: article.tags.join(', '),
    }),
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
