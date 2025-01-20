// Import the Supabase client
import { createClient } from '@/utils/supabase/client';

type Product = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    user_id?: string; // Adăugăm user_id pentru a stoca ID-ul utilizatorului autentificat
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product[]> => {
    const supabase = createClient();

    // Obține utilizatorul autentificat
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Adaugă user_id la obiectul produsului
    const productWithUserId = {
        ...product,
        user_id: userId,
    };

    // Inserează produsul în baza de date
    const { data: products, error: productsError } = await supabase.from('products').insert([productWithUserId]).select();

    if (productsError) {
        throw new Error(productsError.message);
    }

    if (!products || products.length === 0) {
        throw new Error('No products found');
    }

    return products;
};
