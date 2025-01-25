'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';

import ChipTitle from './ChipTitle';

const faqs = [
    {
        id: '1',
        question: 'How is Inventario different from other inventory tools?',
        answer: 'Unlike traditional inventory tools, Inventario focuses on simplicity and speed. Its smart interface adapts to your workflow, reducing manual effort and improving efficiency.',
    },
    {
        id: '2',
        question: 'Is there a learning curve?',
        answer: 'Inventario is designed to be intuitive from the start. Most users are productive within hours. We also provide step-by-step tutorials and detailed documentation to help you get started.',
    },
    {
        id: '3',
        question: 'How do you handle inventory updates?',
        answer: 'Every update in Inventario is automatically saved and versioned. You can track changes, restore previous data, and create custom snapshots for critical records.',
    },
    {
        id: '4',
        question: 'Can I use Inventario offline?',
        answer: 'Yes! Inventario includes a reliable offline mode. Your changes sync seamlessly when you’re back online, ensuring uninterrupted access to your data.',
    },
    {
        id: '5',
        question: 'How does Inventario support collaboration?',
        answer: 'Inventario is built for teamwork. You can invite colleagues, share updates, assign tasks, and collaborate on inventory in real-time, all in one platform.',
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24" id="faqs">
            <div className="container max-w-5xl mx-auto">
                <div className="flex justify-center">
                    <ChipTitle title="FAQs" />
                </div>
                <h2 className="text-5xl font-medium text-center mt-6">
                    Questions? We&apos;ve got
                    <span className="text-accent block">answers</span>
                </h2>
                <div className="mt-12 flex flex-col gap-6">
                    {faqs.map((faq, faqIndex) => (
                        <div key={faq.id} className="bg-neutral-900 rounded-2xl border border-white/15 p-6">
                            <div className="flex justify-between items-center" onClick={() => setSelectedIndex(faqIndex)}>
                                <h3 className="font-medium">{faq.question}</h3>
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
                                    className={twMerge('feather feather-plus text-pink-600 flex-shrink-0 transition duration-300', selectedIndex === faqIndex && 'rotate-45')}
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </div>
                            <AnimatePresence initial={false}>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        }}
                                        className={twMerge('overflow-hidden')}
                                    >
                                        <p className="text-white/50">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
