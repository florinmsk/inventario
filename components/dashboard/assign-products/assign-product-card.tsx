import Link from 'next/link';
import React from 'react';
import { getTranslation } from '@/i18n';

export default function AsignProductCard({ image, title, description, button = false, link = '#' }: { image: string; title: string; description: string; button: boolean; link?: string }) {
    const { t } = getTranslation();
    return (
        <div className="items-md-center flex flex-col rounded-md border border-white-light bg-white px-6 py-3.5 text-center dark:border-dark dark:bg-[#1b2e4b] md:flex-row ltr:md:text-left rtl:md:text-right">
            <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                <img alt="avatar" src={image} className="mx-auto h-11 w-11 rounded-full" />
            </div>
            <div className="flex flex-1 flex-col items-center justify-between md:flex-row">
                <div className="my-3 font-semibold md:my-0">
                    <div className="text-base text-dark dark:text-[#bfc9d4]">{title}</div>
                    <div className="text-xs text-white-dark">{description}</div>
                </div>
                {button && (
                    <div>
                        <Link href={link} className="btn btn-secondary btn-sm px-5 py-2">
                            {t('view')}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
