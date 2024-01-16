/**
 * An array of routes that are accessible to the public.
 * Thes routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  // "/settings", <- url: /settings에 접근가능하게 하려면 이렇게 해야함
];

/**
 * An array of routes that are used for authentication.
 * Thes routes will redirect logged in users to / settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
]

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";