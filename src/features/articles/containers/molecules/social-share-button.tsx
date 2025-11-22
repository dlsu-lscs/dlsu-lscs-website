'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'next-share';
import { FiCopy } from 'react-icons/fi';

interface SocialShareButtonProps {
  icon: string;
  alt: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
}

export default function SocialShareButton({ icon, alt, platform }: SocialShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const articleUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = typeof document !== 'undefined' ? document.title : '';

  const handleInstagramCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (platform === 'facebook') {
    return (
      <FacebookShareButton url={articleUrl} quote={title}>
        <button className="hover:opacity-75 transition-opacity" title="Share on Facebook">
          <Image alt={alt} width={28} height={28} src={icon} />
        </button>
      </FacebookShareButton>
    );
  }

  if (platform === 'twitter') {
    return (
      <TwitterShareButton url={articleUrl} title={title}>
        <button className="hover:opacity-75 transition-opacity" title="Share on Twitter">
          <Image alt={alt} width={32} height={32} src={icon} />
        </button>
      </TwitterShareButton>
    );
  }

  if (platform === 'linkedin') {
    return (
      <LinkedinShareButton url={articleUrl}>
        <button className="hover:opacity-75 transition-opacity" title="Share on LinkedIn">
          <Image alt={alt} width={32} height={32} src={icon} />
        </button>
      </LinkedinShareButton>
    );
  }

  return (
    <button
      onClick={handleInstagramCopy}
      className="relative hover:opacity-75 transition-opacity"
      title={copied ? 'Copied!' : 'Copy link for Instagram'}
    >
      <FiCopy size={32} />
      {copied && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
          Copied!
        </div>
      )}
    </button>
  );
}
