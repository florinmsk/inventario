import { createClient } from '@/utils/supabase/client';
import { uploadFile } from '../uploadFile';

type Product = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
};

const generateImageUrl = (path: string): string => {
    const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public`;
    const bucketName = 'products';
    return `${supabaseUrl}/${bucketName}/${path}`;
};

export const updateProduct = async (productId: number, updates: Partial<Product>, newImageFile?: File): Promise<Product | null> => {
    const supabase = createClient();

    // Obținem datele autentificării utilizatorului
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    const timestamp = Date.now();
    const productName = (updates.title ?? 'product')
        .replace(/[^a-zA-Z0-9\s]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();

    const fileExtension = newImageFile?.name.split('.').pop()?.toLowerCase() || 'jpg';

    // Dacă se specifică o imagine nouă, o încărcăm și ștergem pe cea veche
    let newImageUrl: string | null = null;
    if (newImageFile) {
        // Dacă există deja o imagine veche, o ștergem
        if (updates.image) {
            const imagePath = updates.image.split('/storage/v1/object/public/')[1];
            await supabase.storage.from('products').remove([imagePath]); // Ștergem imaginea veche
        }

        // Încarcă imaginea nouă
        const imagePath = `user_images/${userId}/products/${timestamp}-${productName}.${fileExtension}`;
        await uploadFile(newImageFile, imagePath); // Încarcă imaginea
        newImageUrl = generateImageUrl(imagePath); // Generează URL-ul pentru imaginea nouă
    }

    // Realizăm actualizarea produsului în baza de date
    const { data, error } = await supabase
        .from('products')
        .update({
            ...updates,
            image: newImageUrl || updates.image,
        })
        .eq('id', productId)
        .eq('user_id', userId)
        .select();

    // Verificăm dacă a apărut o eroare
    if (error) {
        throw new Error(error.message);
    }

    // Dacă nu există date actualizate, returnăm `null`
    return data ? data[0] : null;
};
