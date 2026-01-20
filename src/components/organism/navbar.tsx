'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NavbarButton from '../molecules/navbar-button';
import { useScrollDirection } from '@/hooks/useScrollDirection';

export default function Navbar() {
  const pathname = usePathname();
  const { isVisible } = useScrollDirection();

  return (
    <>
      <nav
        className={`z-50 bg-[#1E1E1E] text-white h-20 px-16 flex justify-between items-center font-onest transition-all duration-300 sticky 
         ${!isVisible ? '-top-20' : 'top-0'}`}
      >
        {/* Logo*/}
        <div>
          <Image src="/40th_logo.png" alt="40th logo" width={50} height={37} />
        </div>

        {/* Nav Links */}
        <div className="flex gap-20 text-md h-full items-center">
          {[
            { href: '/', label: 'Home' },
            { href: '/about-us', label: 'About Us' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative flex h-full items-center group
          after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#EDCC46]
          after:scale-x-0 after:origin-left after:transition-transform
          ${pathname === link.href ? 'after:scale-x-100' : ''}
          hover:after:scale-x-100
        `}
            >
              {link.label}
            </a>
          ))}
          <NavbarButton link="mailto:lscs@dlsu.edu.ph">Contact Us</NavbarButton>
        </div>
      </nav>
    </>
  );
}
