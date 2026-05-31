'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type FeaturedArticleProps = {
  title: string;
  date?: string;
  author?: string;
  description: string;
  image: string;
  link: string;
};

export default function FeaturedArticle({
  title,
  date,
  author,
  description,
  image,
  link,
}: FeaturedArticleProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
    >
      <Link
        href={link}
        className="block group bg-linear-to-b from-[#DDB518] to-[#BC7A00] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#ddb518]/20 transition-all duration-500 hover:-translate-y-1 flex flex-col min-h-96 md:flex-row"
      >
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
        </div>

        <div className="p-8 md:w-1/2 flex flex-col justify-between text-white gap-6">
          <div className="flex flex-col gap-3">
            {/* Featured Badge */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 border border-white/30 backdrop-blur-sm">
                Featured
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-onest font-bold leading-tight group-hover:text-white/95 transition-colors">
              {title}
            </h2>

            <p className="text-xs sm:text-sm font-medium text-white/80 tracking-wide uppercase">
              {formattedDate}
              {author ? ` • By ${author}` : ''}
            </p>

            <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-4 font-Poppins">
              {description}
            </p>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 bg-white text-[#77610d] font-bold px-5 py-2.5 rounded-lg hover:bg-white/95 hover:shadow-lg transition-all duration-300">
              Read More
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
