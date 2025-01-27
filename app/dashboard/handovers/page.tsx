'use client';
import IconSearch from '@/components/icon/icon-search';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog, TransitionChild, DialogPanel } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import { getTranslation } from '@/i18n';
import Swal from 'sweetalert2';

import { getHandoverRecordsData } from '@/data/employees/handovers/getHandoversData';

import Link from 'next/link';

export default function EmployeesPage() {
    const { t } = getTranslation();
    const [viewHandoverModal, setViewHandoverModal] = useState<any>(false);
    const [handovers, setHandovers] = useState<any>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculează indexul rândurilor pentru pagina curentă
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    useEffect(() => {
        const fetchHandoversData = async () => {
            try {
                const data = await getHandoverRecordsData();
                setHandovers(data);
                setFilteredItems(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHandoversData();
    }, []);

    const [defaultParams] = useState({
        id: null,
        last_name: '',
        first_name: '',
        email: '',
        function: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value || '' });
    };

    const [search, setSearch] = useState<any>('');
    const employeesList = handovers.map((employee: any) => ({
        id: employee.id,
        last_name: employee.last_name,
        first_name: employee.first_name,
        emial: employee.email,
        function: employee.function,
    }));

    const [filteredItems, setFilteredItems] = useState<any>(employeesList);

    const searchEmployee = () => {
        setFilteredItems(() => {
            return employeesList.filter((item: any) => {
                return item?.last_name.toLowerCase().includes(search.toLowerCase()) || item?.first_name.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchEmployee();
    }, [search]);

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // Total pagini
    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

    // Navigare între pagini
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl">{t('handover_records')}</h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex gap-3">
                            <button type="button" className="btn btn-primary">
                                {t('create_handover')}
                            </button>
                        </div>
                        <div className="relative">
                            <input type="text" placeholder={t('search_handover')} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                <IconSearch className="mx-auto" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>{t('name')}</th>
                                    <th>{t('document')}</th>
                                    <th className="!text-center">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedItems.map((handover: any) => (
                                    <tr key={handover.id}>
                                        <td>{handover.employee_name}</td>
                                        <td>{handover.document}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4">
                                                <Link href={`/dashboard/employees/assign-products/${handover.id}`} className="btn btn-sm btn-outline-success">
                                                    {t('assign_products')}
                                                </Link>
                                                <button type="button" className="btn btn-sm btn-outline-primary">
                                                    {t('edit')}
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger">
                                                    {t('delete')}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginare */}
                    <div className="flex justify-center items-center p-4">
                        <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto">
                            {/* Buton pentru pagina anterioară */}
                            <li>
                                <button
                                    type="button"
                                    className="flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            </li>

                            {/* Generarea numerelor de pagină */}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index + 1}>
                                    <button
                                        type="button"
                                        className={`flex justify-center font-semibold px-3.5 py-2 rounded-full transition ${
                                            currentPage === index + 1
                                                ? 'bg-primary text-white dark:bg-primary'
                                                : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                        }`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            {/* Buton pentru pagina următoare */}
                            <li>
                                <button
                                    type="button"
                                    className="flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Transition appear show={viewHandoverModal} as={Fragment}>
                <Dialog as="div" open={viewHandoverModal} onClose={() => setViewHandoverModal(false)} className="relative z-50">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-screen items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setViewHandoverModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        {params.id ? 'Edit Employee' : 'Add Employee'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="last_name">{t('last_name')}</label>
                                                <input id="last_name" type="text" placeholder={t('enter_lname')} className="form-input" value={params.last_name} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="first_name">{t('first_name')}</label>
                                                <input id="first_name" type="text" placeholder={t('enter_lname')} className="form-input" value={params.first_name} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">{t('email')}</label>
                                                <input id="email" type="email" placeholder={t('enter_email')} className="form-input" value={params.email} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="function">{t('function')}</label>
                                                <input id="function" type="text" placeholder={t('enter_function')} className="form-input" value={params.function} onChange={changeValue} />
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setViewHandoverModal(false)}>
                                                    {t('cancel')}
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {params.id ? t('update') : t('add')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
