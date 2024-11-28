export const userQueryKeys = {
  currentUser: ["user"] as const,
  allUsers: ["users"] as const,
  userById: (id?: string) => ["user", id] as const,
};
