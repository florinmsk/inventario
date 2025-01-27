'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getTranslation } from '@/i18n';
import ReactApexChart from 'react-apexcharts';

import { getEmployeesData } from '@/data/employees/getEmployeesData';
import { getProductsData } from '@/data/products/getProductsData';

export default function DashboardPage() {
    const { t } = getTranslation();
    const [employeesCount, setEmployeesCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [hamdoverReportsCount, setHandoverReportsCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                // Apelăm toate API-urile în paralel
                const [employees, products] = await Promise.all([getEmployeesData(), getProductsData()]);

                // Actualizăm stările cu numărul elementelor
                setEmployeesCount(employees.length);
                setProductsCount(products.length);
            } catch (error) {
                console.error('Eroare la preluarea datelor:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-xl">{t('dashboard')}</h2>
            <div className="pt-5">
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-3">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('employees')}</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {employeesCount} </div>
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('products')}</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{productsCount} </div>
                        </div>
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('handover_records')}</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{hamdoverReportsCount}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2"></div>
            </div>
        </div>
    );
}
