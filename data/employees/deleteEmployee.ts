// Import the Supabase client
import { createClient } from '@/utils/supabase/client';

// Funcția pentru ștergerea unui angajat din baza de date
export const deleteEmployee = async (employeeId: number): Promise<void> => {
    const supabase = createClient();

    // Obține utilizatorul autentificat
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Șterge angajatul din baza de date, verificând că aparține utilizatorului autentificat
    const { error: deleteError } = await supabase.from('employees').delete().eq('id', employeeId).eq('user_id', userId);

    if (deleteError) {
        throw new Error(deleteError.message);
    }
};
