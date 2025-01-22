// Import the Supabase client
import { createClient } from '@/utils/supabase/client';

type Product = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    user_id?: string;
};

// Funcția pentru ștergerea unui produs din baza de date
export const deleteProduct = async (productId: number): Promise<void> => {
    const supabase = createClient();

    // Obține utilizatorul autentificat
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Șterge produsul din baza de date, verificând că aparține utilizatorului autentificat
    const { error: deleteError } = await supabase.from('products').delete().eq('id', productId).eq('user_id', userId); // Asigură-te că produsul aparține utilizatorului

    if (deleteError) {
        throw new Error(deleteError.message);
    }
};
