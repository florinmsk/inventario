import { createClient } from '@/utils/supabase/client';

type Product = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
};

export const getUnassignedProducts = async (): Promise<Product[]> => {
    const supabase = createClient();

    // Verificăm întâi toate produsele
    const { data: products, error: productsError } = await supabase.from('products').select('*');
    if (productsError) {
        return [];
    }

    // Verificăm produsele deja alocate
    const { data: assignedProducts, error: assignedProductsError } = await supabase.from('employee_products').select('product_id');
    if (assignedProductsError) {
        return [];
    }

    // Filtrăm produsele nealocate
    const assignedProductIds = assignedProducts.map((item: any) => item.product_id);
    const unassignedProducts = products.filter((product: any) => !assignedProductIds.includes(product.id));

    return unassignedProducts;
};
