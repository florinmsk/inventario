'use client';
import IconSearch from '@/components/icon/icon-search';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import AssignProductCard from './assign-products/assign-product-card';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';
import { getTranslation } from '@/i18n';

import { getEmployeesData } from '@/data/employees/getEmployeesData';
import { getAssignedProductsWithDetails } from '@/data/employees/assignedProducts/getAssignedProducts';
import { getUnassignedProducts } from '@/data/employees/assignedProducts/getUnassignedProducts';

import { createAssignedProducts } from '@/data/employees/assignedProducts/createAssignedProducts';

export default function AssignProducts({ id }: { id: number }) {
    const { t } = getTranslation();
    const router = useRouter();
    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');

    const [filteredItems, setFilteredItems] = useState<any>([]);
    const [employee, setEmployee] = useState<any>([]);
    const [assignedProducts, setAssignedProducts] = useState<any>([]);
    const [allProducts, setAllProducts] = useState<any>([]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const data = await getEmployeesData();
                const selectedEmployee = data.find((emp: any) => emp.id === id);
                setEmployee(selectedEmployee);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEmployeeData();
    }, [id]);

    useEffect(() => {
        const fetchAssignedProducts = async () => {
            try {
                const data = await getAssignedProductsWithDetails();
                const filteredData = data.filter((product: any) => product.employee_id === id);
                setAssignedProducts(filteredData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAssignedProducts();
    }, [id]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const data = await getUnassignedProducts();
                setAllProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        setFilteredItems(() => {
            return assignedProducts.filter((d: any) => {
                return d.title.toLowerCase().includes(searchProduct.toLowerCase());
            });
        });
    }, [searchProduct, assignedProducts]);

    const saveChanges = async () => {
        try {
            const updatedAssignedProducts = filteredItems.map((product: any) => ({
                product_id: product.id,
                employee_id: id,
            }));

            await createAssignedProducts(updatedAssignedProducts, id);

            showMessage('Changes saved successfully!');

            setTimeout(() => {
                router.push('/dashboard/employees');
            }, 2000);
        } catch (error) {
            console.error('Failed to save changes:', error);
            showMessage('Failed to save changes.');
        }
    };

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

    return (
        <div>
            <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
                <div className={`panel absolute z-10 hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block ${isShowChatMenu ? '!block' : ''}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-none">
                                <img src="/assets/images/avatar.jpg" className="h-12 w-12 rounded-full object-cover" alt="" />
                            </div>
                            <div className="mx-3">
                                <p className="mb-1 font-semibold">{`${employee.last_name} ${employee.first_name}`}</p>
                                <p className="text-xs text-white-dark">{employee.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder={t('search_products')} value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                        <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                            <IconSearch />
                        </div>
                    </div>
                    <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                    <div className="!mt-0">
                        <PerfectScrollbar className="chat-users relative h-full min-h-72 space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5 sm:h-[calc(100vh_-_357px)]">
                            <ReactSortable list={filteredItems} setList={setFilteredItems} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                                {filteredItems.map((product: any) => (
                                    <div key={product.id} className="mb-2.5 cursor-grab">
                                        <AssignProductCard image={product.image || '/assets/images/imgError.jpg'} title={product.title} description={product.description} button={false} />
                                    </div>
                                ))}
                            </ReactSortable>
                        </PerfectScrollbar>
                        <div className="flex justify-center items-center">
                            <button onClick={saveChanges} className="btn btn-sm btn-outline-success">
                                {t('save')}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>
                <div className="panel flex-1 p-4 flex flex-col gap-3">
                    <ReactSortable list={allProducts} setList={setAllProducts} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                        {allProducts.map((product: any) => (
                            <div key={product.id} className="mb-2.5 cursor-grab">
                                <AssignProductCard
                                    image={product.image || '/assets/images/imgError.jpg'}
                                    title={product.title}
                                    description={product.description}
                                    button={false}
                                    link={`/product/${product.id}`}
                                />
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            </div>
        </div>
    );
}
