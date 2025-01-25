'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Fragment } from 'react';

const logos = [
    { name: 'Quantum', image: '/assets/images/logos/quantum.svg' },
    { name: 'Acme Corp', image: '/assets/images/logos/acme-corp.svg' },
    { name: 'Echo Valley', image: '/assets/images/logos/echo-valley.svg' },
    { name: 'Pulse', image: '/assets/images/logos/pulse.svg' },
    { name: 'Outside', image: '/assets/images/logos/outside.svg' },
    { name: 'Apex', image: '/assets/images/logos/apex.svg' },
    { name: 'Celestial', image: '/assets/images/logos/celestial.svg' },
    { name: 'Twice', image: '/assets/images/logos/twice.svg' },
];

export default function LogoTicker() {
    return (
        <section className="py-24 overflow-x-clip">
            <div className="container max-w-5xl mx-auto">
                <h3 className="text-center text-white/50 text-xl">Already choosen by</h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div animate={{ x: '-50%' }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }} className="flex flex-none gap-24 pr-24">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Fragment key={i}>
                                {logos.map((logo) => (
                                    <Image width={150} height={40} key={logo.name} src={logo.image} alt={logo.name} />
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
