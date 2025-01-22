// Import the Supabase client
import { createClient } from '@/utils/supabase/client';
import { uploadFile } from '../uploadFile';

type Product = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    user_id?: string;
};

const generateImageUrl = (path: string): string => {
    const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public`;
    const bucketName = 'products';
    return `${supabaseUrl}/${bucketName}/${path}`;
};

export const createProduct = async (product: Omit<Product, 'id'>, file?: File): Promise<Product[]> => {
    const supabase = createClient();

    // Obține utilizatorul autentificat
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    const timestamp = Date.now();
    const productName = (product.title ?? 'product')
        .replace(/[^a-zA-Z0-9\s]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();

    const fileExtension = file?.name.split('.').pop()?.toLowerCase() || 'jpg';

    // Încarcă imaginea în Supabase Storage
    let imagePath = null;
    if (file) {
        imagePath = `user_images/${userId}/products/${timestamp}-${productName}.${fileExtension}`;
        await uploadFile(file, imagePath); // Încarcă imaginea
    }

    const imageUrl = imagePath ? generateImageUrl(imagePath) : null;

    // Adaugă user_id la obiectul produsului
    const productWithUserId = {
        ...product,
        user_id: userId,
        image: imageUrl,
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
