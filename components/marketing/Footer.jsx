import Link from 'next/link';

const footerLinks = [
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms & Conditions' },
];

export default function Footer() {
    return (
        <section className="py-16">
            <div className="container max-w-5xl mx-auto ">
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
                    <div>
                        <img src="assets/images/logo-dark.svg" alt="Inventario Logo" className="h-9 md:h-10 w-auto" />
                    </div>
                    <div>
                        <nav className="flex gap-6">
                            {footerLinks.map((footerLink, linkIndex) => (
                                <Link key={linkIndex} href={footerLink.href} className="text-white/50 text-sm">
                                    {footerLink.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}
