import { createClient } from '@/utils/supabase/client';

type Employee = {
    id: number;
    last_name: string;
    first_name: string;
    email?: string | null;
    function?: string | null;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee[]> => {
    const supabase = createClient();

    // Verifică autentificarea utilizatorului
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Adaugă user_id și folosește coloana function
    const employeeWithUserId = {
        ...employee,
        user_id: userId, // Adaugă user_id
    };

    // Inserează angajatul în baza de date
    const { data: employees, error: employeesError } = await supabase.from('employees').insert([employeeWithUserId]).select();

    if (employeesError) {
        throw new Error(employeesError.message);
    }

    return employees;
};
