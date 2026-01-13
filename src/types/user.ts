/**
 * User-related types for the application
 * 
 * These types mirror the Supabase database schema
 * and provide type safety throughout the app
 */

// Role hierarchy: SUPER_ADMIN > ADMIN > MANAGER > DIRECTOR > FINANCE > STAFF
export type UserRole =
    | 'SUPER_ADMIN'
    | 'ADMIN'
    | 'MANAGER'
    | 'DIRECTOR'
    | 'FINANCE'
    | 'STAFF';

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    department?: string;
    avatar_url?: string;
    is_active: boolean;
    last_login?: string;
    created_at: string;
    updated_at: string;
}

export interface UserProfile extends User {
    phone?: string;
    timezone?: string;
    two_factor_enabled: boolean;
}

// Permission levels for RBAC
export const ROLE_PERMISSIONS: Record<UserRole, number> = {
    SUPER_ADMIN: 100,
    ADMIN: 80,
    DIRECTOR: 70,
    MANAGER: 60,
    FINANCE: 50,
    STAFF: 10,
};

/**
 * Check if a user has permission to access a feature
 * @param userRole - The user's role
 * @param requiredRole - The minimum required role
 */
export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
    return ROLE_PERMISSIONS[userRole] >= ROLE_PERMISSIONS[requiredRole];
}

/**
 * Get display name for a role
 */
export function getRoleDisplayName(role: UserRole): string {
    const names: Record<UserRole, string> = {
        SUPER_ADMIN: 'Super Administrator',
        ADMIN: 'Administrator',
        DIRECTOR: 'Director',
        MANAGER: 'Manager',
        FINANCE: 'Finance Officer',
        STAFF: 'Staff',
    };
    return names[role];
}
