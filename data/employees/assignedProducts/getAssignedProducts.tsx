import { createClient } from '@/utils/supabase/client';

type ProductWithAssignment = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    employee_id: number | null; // Include employee_id pentru a indica asignarea
};

export const getAssignedProductsWithDetails = async (): Promise<ProductWithAssignment[]> => {
    const supabase = createClient();

    // Verificăm autentificarea utilizatorului
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
        return [];
    }

    // Obținem toate produsele
    const { data: products, error: productsError } = await supabase.from('products').select('id, title, description, image');
    if (productsError || !products) {
        return [];
    }

    // Obținem toate asignările produselor
    const { data: assignedProducts, error: assignedProductsError } = await supabase.from('employee_products').select('product_id, employee_id');
    if (assignedProductsError || !assignedProducts) {
        return [];
    }

    // Construim o hartă pentru a lega produsele de `employee_id`
    const assignmentMap = new Map(assignedProducts.map((assignment) => [assignment.product_id, assignment.employee_id]));

    // Marcăm fiecare produs cu `employee_id` (sau null dacă nu este asignat)
    const result = products.map((product) => ({
        ...product,
        employee_id: assignmentMap.get(product.id) || null,
    }));

    return result;
};
