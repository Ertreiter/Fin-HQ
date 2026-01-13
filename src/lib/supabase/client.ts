import { createBrowserClient } from '@supabase/ssr';

// PERFORMANCE: Singleton pattern - only one client instance
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Creates a Supabase client for browser-side operations
 * Uses singleton pattern to prevent multiple client instances
 * which could cause memory leaks and connection issues
 */
export function createClient() {
    if (supabaseClient) {
        return supabaseClient;
    }

    supabaseClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    return supabaseClient;
}

// Export types for Supabase
export type { User, Session } from '@supabase/supabase-js';
