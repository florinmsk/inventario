'use client';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';

import IconX from '@/components/icon/icon-x';
import { Transition, Dialog, TransitionChild, DialogPanel } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { getTranslation } from '@/i18n';

import { getProductsData } from '@/data/products/getProductsData';
import { createProduct } from '@/data/products/createProduct';
import { deleteProduct as deleteProductFromDB } from '@/data/products/deleteProduct';
import { updateProduct } from '@/data/products/updateProduct';

export default function ProductsPage() {
    const { t } = getTranslation();
    const [addProductModal, setAddProductModal] = useState<any>(false);
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const data = await getProductsData();
                setProducts(data);
                setFilteredItems(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductsData();
    }, []);

    const [value, setValue] = useState<any>('grid');
    const [defaultParams] = useState({
        id: null,
        title: '',
        description: '',
        image: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value || '' });
    };

    const [search, setSearch] = useState<any>('');
    const productsList = products.map((product: any) => ({
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
    }));

    const [filteredItems, setFilteredItems] = useState<any>(productsList);

    const searchProduct = () => {
        setFilteredItems(() => {
            return productsList.filter((item: any) => {
                return item?.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchProduct();
    }, [search]);

    const saveProduct = async () => {
        if (!params.title) {
            showMessage(t('titleRequired'), 'error');
            return true;
        }

        try {
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            const file = fileInput?.files?.[0];

            if (params.id) {
                // Actualizează produsul
                if (file && file.size > 0) {
                    await updateProduct(params.id, params, file);
                    showMessage(t('product_updated'));
                } else {
                    showMessage(t('product_updated'));
                    await updateProduct(params.id, params);
                }
            } else {
                // Adaugă produsul
                let product = {
                    image: params.image || null,
                    title: params.title,
                    description: params.description || null,
                };

                console.log('file', file);

                if (file && file.size > 0) {
                    await createProduct(product, file);
                } else {
                    await createProduct(product);
                }

                showMessage(t('product_added'));
            }

            // Reîncarcă datele produselor după adăugare sau actualizare
            const data = await getProductsData();
            setProducts(data);
            setFilteredItems(data);

            // Închide modalul de adăugare produs
            setAddProductModal(false);
        } catch (error) {
            showMessage(t('error_saving') + error, 'error');
        }
    };

    const editProduct = (product: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));

        if (product) {
            json.id = product.id;
            json.title = product.title || '';
            json.description = product.description || '';
            json.image = product.image || '';
        }
        setParams(json);
        setAddProductModal(true);
    };

    const deleteProduct = async (product: any = null) => {
        try {
            // Apelează funcția de ștergere din baza de date
            await deleteProductFromDB(product.id);

            // Actualizează lista locală de produse
            setFilteredItems(filteredItems.filter((d: any) => d.id !== product.id));

            // Afișează mesajul de succes
            showMessage(t('product_deleted'));
        } catch (error) {
            // Dacă apare o eroare, o afișăm
            showMessage(t('error_deleting') + error);
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
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{t('products')}</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editProduct()}>
                                {t('add_product')}
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={t('search_products')} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>{t('title')}</th>
                                    <th>{t('description')}</th>
                                    <th className="!text-center">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((product: any) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>
                                            <div className="flex w-max items-center">
                                                <div className="w-max">
                                                    <img
                                                        src={product.image && product.image !== '' ? product.image : '/assets/images/imgError.jpg'}
                                                        className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                                        alt="avatar"
                                                    />
                                                </div>

                                                <div>{product.title}</div>
                                            </div>
                                        </td>
                                        <td>{product.description}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editProduct(product)}>
                                                    {t('edit')}
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(product)}>
                                                    {t('delete')}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredItems.map((product: any) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={product.id}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="rounded-t-md bg-white/10 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0">
                                        <img
                                            className="mx-auto max-h-44 min-h-44 w-4/5 object-contain"
                                            src={product.image && product.image !== '' ? product.image : '/assets/images/imgError.jpg'}
                                            alt="product_image"
                                        />
                                    </div>
                                    <div className="relative -mt-10 px-6 pb-24">
                                        <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                                            <div className="text-xl">{product.title}</div>
                                            <div className="text-white-dark">{product.description}</div>
                                        </div>
                                        <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                            <button type="button" className="btn btn-outline-primary w-1/2" onClick={() => editProduct(product)}>
                                                {t('edit')}
                                            </button>
                                            <button type="button" className="btn btn-outline-danger w-1/2" onClick={() => deleteProduct(product)}>
                                                {t('delete')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Transition appear show={addProductModal} as={Fragment}>
                <Dialog as="div" open={addProductModal} onClose={() => setAddProductModal(false)} className="relative z-50">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddProductModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        {params.id ? t('edit_product') : t('add_product')}
                                    </div>
                                    <div className="p-5">
                                        <form encType="multipart/form-data">
                                            <div className="mb-5">
                                                <label htmlFor="title">{t('title')}</label>
                                                <input id="title" type="text" placeholder={t('enter_title')} className="form-input" value={params.title} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="description">{t('description')}</label>
                                                <textarea
                                                    id="description"
                                                    placeholder={t('enter_description')}
                                                    rows={5}
                                                    className="form-input"
                                                    value={params.description}
                                                    onChange={changeValue}
                                                ></textarea>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="image">{t('image')}</label>
                                                <input id="image" type="file" className="form-input" onChange={changeValue} accept="image/*" />
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddProductModal(false)}>
                                                    {t('cancel')}
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveProduct}>
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
