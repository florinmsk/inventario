'use client';

import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                <div className="rounded-t-md bg-white/10 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0">
                    <img className="mx-auto max-h-44 min-h-44 w-4/5 object-contain" src="/assets/images/imgError.jpg" alt="product_image" />
                </div>
                <div className="relative -mt-10 px-6 pb-24">
                    <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                        <div className="text-xl">Titlu</div>
                        <div className="text-white-dark">Descriere</div>
                    </div>
                    <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                        <button type="button" className="btn btn-outline-primary w-1/2">
                            Editeaza
                        </button>
                        <button type="button" className="btn btn-outline-danger w-1/2">
                            Sterge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
