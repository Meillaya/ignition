import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  '/profile(.*)'
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/api(.*)',
  '/pricing',
  '/about',
  '/contact'
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth().protect();
  }
  
  // Allow public routes to bypass authentication
  if (isPublicRoute(req)) {
    return;
  }
  
  // Redirect unauthenticated users to login page for other routes
  if (!auth().userId) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
