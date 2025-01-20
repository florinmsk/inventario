'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function emailLogin(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        display_name: formData.get('fullname') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                display_name: data.display_name,
                full_name: data.display_name,
            },
        },
    });

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/login');
}

export async function logout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/login');
}

export async function signInWith(provider: 'google' | 'facebook' | 'discord'): Promise<void> {
    const supabase = await createClient();

    const authCallbackUrl = `${process.env.SITE_URL}/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: authCallbackUrl,
        },
    });

    if (error) {
        redirect('/error');
        return;
    }

    revalidatePath('/', 'layout');
    redirect(data.url);
}

export async function signInWithGoogle(): Promise<void> {
    return signInWith('google');
}

export async function signInWithFacebook(): Promise<void> {
    return signInWith('facebook');
}
