// Import the Supabase client
import { createClient } from '@/utils/supabase/client';

type AssignedProduct = {
    product_id: number;
    employee_id: number;
};

export const createAssignedProducts = async (assignedProducts: AssignedProduct[], employeeId: number): Promise<void> => {
    const supabase = createClient();

    // Obține utilizatorul autentificat
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id; // Obține user_id-ul

    try {
        // Obține toate produsele asignate existente pentru angajat
        const { data: existingProducts, error: fetchError } = await supabase.from('employee_products').select('product_id').eq('employee_id', employeeId);

        if (fetchError) {
            throw new Error(fetchError.message);
        }

        const existingProductIds = existingProducts?.map((p) => p.product_id) || [];

        // Găsește produsele care trebuie adăugate
        const productsToAdd = assignedProducts
            .filter((product) => !existingProductIds.includes(product.product_id))
            .map((product) => ({
                ...product,
                user_id: userId, // Adaugă user_id la fiecare produs
            }));

        // Găsește produsele care trebuie șterse
        const productsToRemove = existingProductIds.filter((productId) => !assignedProducts.some((p) => p.product_id === productId));

        // Adaugă produsele noi
        if (productsToAdd.length > 0) {
            const { error: insertError } = await supabase.from('employee_products').insert(productsToAdd);

            if (insertError) {
                throw new Error(insertError.message);
            }
        }

        // Șterge produsele scoase
        if (productsToRemove.length > 0) {
            const { error: deleteError } = await supabase.from('employee_products').delete().eq('employee_id', employeeId).in('product_id', productsToRemove);

            if (deleteError) {
                throw new Error(deleteError.message);
            }
        }
    } catch (error) {
        console.error('Error saving assigned products:', error);
        throw error;
    }
};
