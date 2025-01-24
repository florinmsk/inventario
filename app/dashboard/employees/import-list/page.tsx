'use client';
import { createEmployee } from '@/data/employees/createEmployee';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2';
import { getTranslation } from '@/i18n';

import IconLoader from '@/components/icon/icon-loader';

const tableHeaders = ['Last Name', 'First Name', 'Email', 'Function'];

export default function ImportListPage() {
    const { t } = getTranslation();
    const [tableData, setTableData] = useState<any[]>([]); // Stochează datele importate

    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Citește fișierul
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target?.result;
            if (!binaryStr) return;

            // Parsează fișierul cu librăria XLSX
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Prima foaie
            const sheet = workbook.Sheets[sheetName];

            // Convertește datele într-un array de obiecte
            const data = XLSX.utils.sheet_to_json(sheet);

            // Filtrează și setează datele pentru tabel
            if (data.length > 0) {
                const filteredData = data.map((row: any) => {
                    return {
                        'Last Name': row['Last Name'] || '',
                        'First Name': row['First Name'] || '',
                        Email: row['Email'] || '',
                        Function: row['Function'] || '',
                    };
                });
                setTableData(filteredData); // Stochează datele
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleUploadList = async () => {
        if (tableData.length === 0) {
            showMessage(t('no_data_to_upload'), 'error');
            return;
        }

        setIsUploading(true);
        try {
            for (const row of tableData) {
                await createEmployee({
                    last_name: row['Last Name'],
                    first_name: row['First Name'],
                    email: row['Email'] || null,
                    function: row['Function'] || null,
                });
            }
            showMessage(t('list_uploaded'));
        } catch (error) {
            console.error(t('uploading_error'), error);
            showMessage(t('uploading_error'), 'error');
        } finally {
            setIsUploading(false);
            setTableData([]);
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
        <div className="p-4">
            <div className="flex flex-col justify-center mb-4">
                <h2 className="text-lg font-bold mb-4 text-center">{t('fileImportMessage')}</h2>
                <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="file-input mb-4 border rounded p-2" />
            </div>
            {tableData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                {tableHeaders.map((header, index) => (
                                    <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex} className="odd:bg-white even:bg-gray-100">
                                    {tableHeaders.map((header, colIndex) => (
                                        <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                            {row[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">{t('noFileUploadedMessage')}</p>
            )}

            <div className="flex justify-center mt-5">
                <button className={`btn btn-primary ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={!isUploading ? handleUploadList : undefined} disabled={isUploading}>
                    {isUploading ? (
                        <span className="flex items-center justify-center">
                            <IconLoader className="inline-block shrink-0 animate-[spin_2s_linear_infinite] align-middle ltr:mr-2 rtl:ml-2" />
                            <span>{t('loading')}</span>
                        </span>
                    ) : (
                        t('upload_list')
                    )}
                </button>
            </div>
        </div>
    );
}
