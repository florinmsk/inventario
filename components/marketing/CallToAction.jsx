'use client';

import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

export default function CallToAction() {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(scope.current, { x: '-50%' }, { duration: 30, ease: 'linear', repeat: Infinity });
    });
    return (
        <section className="py-24">
            <div className="container max-w-5xl mx-auto">
                <div className="overflow-x-clip p-4 flex">
                    <motion.div ref={scope} className="flex flex-none gap-16 text-7xl font-medium">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex justify-center gap-16">
                                <span className="text-pink-600">&#10038;</span>
                                <span>Try it for free!</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
