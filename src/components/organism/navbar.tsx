'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NavbarButton from '../molecules/navbar-button';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export default function Navbar() {
  const pathname = usePathname();
  const { isVisible } = useScrollDirection();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/press-release', label: 'Press Release' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <>
      <nav
        className={`z-50 bg-[#1E1E1E] text-white h-20 px-8 lg:px-16 flex justify-between items-center font-onest transition-all duration-300 sticky 
         ${!isVisible ? '-top-20' : 'top-0'}`}
      >
        {/* Logo*/}
        <div className="mr-4 shrink-0">
          <Link href={'/'}>
            <Image
              src="/40th_logo.png"
              alt="40th logo"
              width={50}
              height={37}
              className="w-12.5 h-9.25"
              loading="eager"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex md:gap-8 lg:gap-20 text-md h-full items-center">
          {links.map((link) => (
            <Link
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
            </Link>
          ))}
          <NavbarButton link="/#contact-us">Contact Us</NavbarButton>
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open navigation menu">
              <GiHamburgerMenu size={28} className="text-white" />
            </SheetTrigger>
            <SheetContent className="bg-[#1E1E1E] text-white border-none outline-none shadow-none font-onest p-6 flex flex-col">
              <SheetHeader className="flex items-start gap-4">
                <SheetTitle>
                  <Image
                    src="/40th_logo.png"
                    alt="40th logo"
                    width={55}
                    height={37}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </SheetTitle>
                <div className="flex font-medium text-xl  font-onest">
                  La Salle Computer Society
                </div>
              </SheetHeader>

              <div className="mt-6 flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-6 text-lg items-start font-medium">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={`transition-colors duration-200 ${
                            isActive
                              ? 'text-[#EDCC46] font-bold'
                              : 'text-white/80 hover:text-[#EDCC46]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
                <div className="mt-auto pb-6 flex flex-col w-full">
                  <SheetClose asChild>
                    <NavbarButton link="/#contact-us">Contact Us</NavbarButton>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
