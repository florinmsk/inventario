import { createClient } from '@/utils/supabase/client';

type Product = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
};

export const getProductsData = async (): Promise<Product[]> => {
    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    let { data: products, error: productsError } = await supabase.from('products').select('*').eq('user_id', userId);

    if (productsError) {
        throw new Error(productsError.message);
    }

    if (!products || products.length === 0) {
        throw new Error('No products found');
    }

    return products;
};
