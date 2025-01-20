export {}

// Define our application roles
export type Roles = 'admin' | 'contractor' | 'client'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean
      role?: Roles
    }
  }
}
