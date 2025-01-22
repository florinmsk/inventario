import { createClient } from '@/utils/supabase/client';

type Employee = {
    id: number;
    name: string;
    email?: string | null;
    position?: string | null;
};

export const getEmployeesData = async (): Promise<Employee[]> => {
    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    let { data: employees, error: employeesError } = await supabase.from('employees').select('*').eq('user_id', userId);

    if (employeesError) {
        throw new Error(employeesError.message);
    }

    if (!employees || employees.length === 0) {
        throw new Error('No products found');
    }

    return employees;
};
