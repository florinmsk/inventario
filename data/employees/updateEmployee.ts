import { createClient } from '@/utils/supabase/client';

type Employee = {
    id: number;
    last_name: string;
    first_name: string;
    email?: string | null;
    position?: string | null;
};

export const updateEmployee = async (employeeId: number, updates: Partial<Employee>): Promise<Employee | null> => {
    const supabase = createClient();

    // Obținem datele autentificării utilizatorului
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Realizăm actualizarea angajatului în baza de date
    const { data, error } = await supabase
        .from('employees')
        .update({
            ...updates,
        })
        .eq('id', employeeId)
        .eq('user_id', userId) // Presupunem că există un câmp `user_id` pentru filtrare
        .select();

    // Verificăm dacă a apărut o eroare
    if (error) {
        throw new Error(error.message);
    }

    // Dacă nu există date actualizate, returnăm `null`
    return data ? data[0] : null;
};
