// Import the Supabase client
import { createClient } from '@/utils/supabase/client';

type Employee = {
    id: number;
    last_name: string;
    first_name: string;
    email?: string | null;
    position?: string | null;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee[]> => {
    const supabase = createClient();

    // Obține utilizatorul autentificat
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Adaugă user_id la obiectul angajatului (dacă este necesar în baza de date)
    const employeeWithUserId = {
        ...employee,
        user_id: userId,
    };

    // Inserează angajatul în baza de date
    const { data: employees, error: employeesError } = await supabase.from('employees').insert([employeeWithUserId]).select();

    if (employeesError) {
        throw new Error(employeesError.message);
    }

    if (!employees || employees.length === 0) {
        throw new Error('No employees found');
    }

    return employees;
};
