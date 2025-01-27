'use client';

import React from 'react';

export default function SkeletonList() {
    return (
        <td>
            <div className="flex justify-center gap-4">
                <div className="h-8 w-16 rounded-md bg-gray-300 animate-pulse"></div>
                <div className="h-8 w-16 rounded-md bg-gray-300 animate-pulse"></div>
            </div>
        </td>
    );
}
