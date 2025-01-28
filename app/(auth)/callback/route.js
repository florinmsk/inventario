import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next');
    const isValidNext = next && next.startsWith('/') && next !== '/';
    const redirectPath = isValidNext ? next : '/dashboard';

    if (!code) {
        console.warn('Missing code parameter in URL.');
        return NextResponse.redirect(`${origin}/error?message=Missing+code+parameter`);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error('Error exchanging code for session:', error.message);
        return NextResponse.redirect(`${origin}/error?message=${encodeURIComponent(error.message)}`);
    }

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalEnv = process.env.NODE_ENV === 'development';

    if (isLocalEnv) {
        console.log(`Redirecting locally to: ${origin}${redirectPath}`);
        return NextResponse.redirect(`${origin}${redirectPath}`);
    } else if (forwardedHost) {
        console.log(`Redirecting via forwarded host: https://${forwardedHost}${redirectPath}`);
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`);
    } else {
        console.warn(`Missing x-forwarded-host. Falling back to origin: ${origin}${redirectPath}`);
        return NextResponse.redirect(`${origin}${redirectPath}`);
    }
}
