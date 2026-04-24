export const getInitials = (first?: string | null, last?: string | null) => {
  if (!first && !last) return "";

  const firstInitial = first?.charAt(0) ?? "";
  const lastInitial = last?.charAt(0) ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
