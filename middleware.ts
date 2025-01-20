import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes: string[] = ['/dashboard'];

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    supabaseResponse.cookies.set(name, value, options);
                });
            },
        },
    });

    // Verifică dacă ruta este protejată
    const pathName = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => pathName.startsWith(route));

    if (isProtectedRoute) {
        // Obține sesiunea utilizatorului
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            // Dacă utilizatorul nu este autentificat, redirecționează la /login
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Returnează răspunsul inițial
    return supabaseResponse;
};

export const config = {
    matcher: [
        /*
         * Aplica middleware-ul doar pe rutele relevante.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
