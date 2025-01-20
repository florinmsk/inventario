import { createClient } from '@/utils/supabase/client';

type Profile = {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string | null;
    phone: string | null;
};

export const getAuthUserProfile = async (): Promise<Profile[]> => {
    const supabase = createClient();

    // Fetch the authenticated user
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        console.error('Authentication error:', authError?.message);
        throw new Error('User not authenticated');
    }

    const userId = authData.user.id;

    // Fetch the profile data, explicitly defining the response type
    const { data: profile, error: profileError } = await supabase
        .from('profiles') // Table name as a string
        .select('first_name, last_name, email, avatar_url, phone')
        .eq('id', userId);

    if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        throw new Error(profileError.message);
    }

    if (!profile || profile.length === 0) {
        throw new Error('No profiles found');
    }

    return profile; // Returns array of Profile objects
};
