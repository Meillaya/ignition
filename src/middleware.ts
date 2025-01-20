import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  '/profile(.*)'
]);

const isContractorRoute = createRouteMatcher([
  '/contractor(.*)'
]);

const isClientRoute = createRouteMatcher([
  '/client(.*)'
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
    const { userId, sessionClaims } = await auth().protect()
    
    // Check role-based access
    const role = sessionClaims?.publicMetadata?.role || 'client'
    
    if (isContractorRoute(req) && role !== 'contractor') {
      return new Response('Unauthorized', { status: 401 })
    }
    
    if (isClientRoute(req) && role !== 'client') {
      return new Response('Unauthorized', { status: 401 })
    }
  }
  
  // Allow public routes to bypass authentication
  if (isPublicRoute(req)) {
    return;
  }
  
  // Redirect unauthenticated users to login page for other routes
  if (!(await auth()).userId) {
    return (await auth()).redirectToSignIn({ returnBackUrl: req.url });
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
