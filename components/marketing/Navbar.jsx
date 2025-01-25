'use client';
import { useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#introduction' },
    { label: 'FAQs', href: '#faqs' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    return (
        <section className="py-4 lg:py-8 sticky top-0 z-50">
            <div className="container max-w-5xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-3 border border-white/25 rounded-full p-2 px-4 md:pr-2 items-center bg-neutral-950/50 backdrop-blur">
                    <div>
                        <Image height={40} width={150} src="assets/images/logo-dark.svg" alt="Inventario Logo" className="h-9 md:h-10 w-auto" />
                    </div>
                    <div className="lg:flex justify-center items-center hidden">
                        <nav className="flex gap-6 font-medium">
                            {navLinks.map((link) => (
                                <Link href={link.href} key={link.label} className="text-white">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex justify-end gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-menu md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <line x1="3" y1="6" x2="21" y2="6" className={twMerge('origin-left transition', isOpen && 'rotate-45 -translate-y-1')}></line>
                            <line x1="3" y1="12" x2="21" y2="12" className={twMerge('transition', isOpen && 'opacity-0')}></line>
                            <line x1="3" y1="18" x2="21" y2="18" className={twMerge('origin-left transition', isOpen && '-rotate-45 translate-y-1')}></line>
                        </svg>

                        <Button variant="secondary" className="hidden md:inline-flex" onClick={() => router.push('/login')}>
                            Log In
                        </Button>
                        <Button variant="primary" className="hidden md:inline-flex" onClick={() => router.push('/signup')}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
