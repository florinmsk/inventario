'use client';

// Import necessary icons and components
import IconMail from '@/components/icon/icon-mail';
import IconPhone from '@/components/icon/icon-phone';
import IconShoppingBag from '@/components/icon/icon-shopping-bag';
import IconUser from '@/components/icon/icon-user';
import Image from 'next/image';

import React, { useState, useEffect } from 'react';

// Import data fetching functions
import { getAuthUserProfile } from '@/data/authUserProfile';
import { getEmployeesData } from '@/data/employees/getEmployeesData';
import { getProductsData } from '@/data/products/getProductsData';

// Define TypeScript interface for Profile data
type Profile = {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string | null;
    phone: string | null;
};

export default function ProfilePage() {
    // State management for profile and counts
    const [profile, setProfile] = useState<Profile | any>('');
    const [employeesCount, setEmployeesCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getAuthUserProfile();
                setProfile(data[0]);
            } catch (err) {
                // Handle error silently
            }
        };
        fetchUserProfile();
    }, []);

    // Fetch employees and products count data
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all data in parallel for better performance
                const [employees, products] = await Promise.all([getEmployeesData(), getProductsData()]);

                // Update state with counts
                setEmployeesCount(employees.length);
                setProductsCount(products.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <div className="pt-5">
                {/* Profile and Summary Grid Layout */}
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Profile Card */}
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
                        </div>
                        <div className="mb-5">
                            {/* Profile Image and Name */}
                            <div className="flex flex-col items-center justify-center">
                                <Image
                                    width={96}
                                    height={96}
                                    priority
                                    className="mb-5 h-24 w-24 rounded-full object-cover"
                                    src={profile.avatar_url || '/assets/images/avatar.jpg'}
                                    alt={`${profile.first_name} avatar`}
                                />
                                <p className="text-xl font-semibold text-primary">{`${profile.last_name} ${profile.first_name}`}</p>
                            </div>
                            {/* Contact Information */}
                            <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="h-5 w-5 shrink-0" />
                                        <span className="truncate text-primary">{profile.email}</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        {profile.phone}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="text-lg font-semibold dark:text-white-light">Summary</h5>
                            </div>
                            {/* Statistics Cards */}
                            <div className="space-y-4">
                                {/* Products Count Card */}
                                <div className="rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]">
                                    <div className="flex items-center justify-between p-4 py-2">
                                        <div className="grid h-9 w-9 place-content-center rounded-md bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light">
                                            <IconShoppingBag />
                                        </div>
                                        <div className="flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4">
                                            <h6 className="text-[13px] text-white-dark dark:text-white-dark">
                                                Products added
                                                <span className="block text-base text-[#515365] dark:text-white-light">{productsCount}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                {/* Employees Count Card */}
                                <div className="rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]">
                                    <div className="flex items-center justify-between p-4 py-2">
                                        <div className="grid h-9 w-9 place-content-center rounded-md bg-info-light text-info dark:bg-info dark:text-info-light">
                                            <IconUser />
                                        </div>
                                        <div className="flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4">
                                            <h6 className="text-[13px] text-white-dark dark:text-white-dark">
                                                Employees added
                                                <span className="block text-base text-[#515365] dark:text-white-light">{employeesCount}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
