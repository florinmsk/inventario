import { createClient } from '@/utils/supabase/client';

type HandoverRecord = {
    id: number;
    employee_id: number;
    document: string;
    employee_name: string;
};

export const getHandoverRecordsData = async (): Promise<HandoverRecord[]> => {
    const supabase = createClient();

    // Preluăm datele din tabela `handover_records`
    const { data: handoverRecords, error: handoverError } = await supabase.from('handover_records').select('id, employee_id, document');
    if (handoverError || !handoverRecords) {
        throw new Error(handoverError?.message || 'No handover records found');
    }

    // Preluăm datele din tabela `employees` pentru toți angajații
    const { data: employees, error: employeesError } = await supabase.from('employees').select('id, first_name, last_name');
    if (employeesError || !employees) {
        throw new Error(employeesError?.message || 'No employees found');
    }

    // Construim un Map pentru a lega `employee_id` de numele complet al angajatului
    const employeeMap = new Map(
        employees.map((employee) => [
            employee.id,
            `${employee.first_name} ${employee.last_name}`, // Concatenăm first_name și last_name
        ]),
    );

    // Adăugăm `employee_name` la fiecare record din `handover_records`
    const transformedRecords: HandoverRecord[] = handoverRecords.map((record) => ({
        id: record.id,
        employee_id: record.employee_id,
        document: record.document,
        employee_name: employeeMap.get(record.employee_id) || 'Unknown', // Folosim `Unknown` dacă nu găsim angajatul
    }));

    return transformedRecords;
};
