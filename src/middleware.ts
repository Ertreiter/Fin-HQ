import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js Middleware
 * 
 * SECURITY FEATURES:
 * - Session refresh on every request (when Supabase is configured)
 * - Route protection for dashboard
 * - Redirect authenticated users from auth pages
 * 
 * PERFORMANCE:
 * - Matcher config excludes static assets
 * - Gracefully handles missing Supabase config
 */

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/admin', '/finance', '/users', '/settings'];

// Auth routes (redirect to dashboard if authenticated)
const authRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If Supabase is not configured, skip auth checks but allow navigation
    if (!supabaseUrl || supabaseUrl === 'your-project-url' || !supabaseKey || supabaseKey === 'your-anon-key') {
        // For protected routes without Supabase, redirect to login
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        if (isProtectedRoute) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            url.searchParams.set('message', 'Please configure Supabase to access the dashboard');
            return NextResponse.redirect(url);
        }
        // Allow public routes
        return NextResponse.next();
    }

    // Supabase is configured - dynamically import to avoid errors
    try {
        const { createServerClient } = await import('@supabase/ssr');

        let supabaseResponse = NextResponse.next({ request });

        const supabase = createServerClient(supabaseUrl, supabaseKey, {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        });

        const { data: { user } } = await supabase.auth.getUser();

        // Protected routes - redirect to login if not authenticated
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        if (isProtectedRoute && !user) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }

        // Auth routes - redirect to dashboard if authenticated
        const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
        if (isAuthRoute && user) {
            const url = request.nextUrl.clone();
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }

        return supabaseResponse;
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next();
    }
}

// PERFORMANCE: Only run middleware on pages, not static assets
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
