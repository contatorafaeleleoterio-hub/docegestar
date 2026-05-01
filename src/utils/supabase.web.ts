// Web mock — supabase auth não está disponível na versão web/preview.
// Metro resolve este arquivo automaticamente ao buildar para web (.web.ts).
export const supabase = {
  auth: {
    signInWithIdToken: async () => ({ data: null, error: new Error('Supabase auth not available on web') }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
} as const;
