import { createClient } from '@/utils/supabase/client';

// Funcția pentru încărcarea fișierelor
export async function uploadFile(file: File, path: string): Promise<string> {
    const supabase = createClient();

    const { data, error } = await supabase.storage.from('products').upload(path, file);

    if (error) {
        throw new Error('Error uploading file: ' + error.message);
    }

    // Returnează calea fișierului încărcat
    return data?.path ?? '';
}
