const mapping = {
  ADMIN: "Administrator",
  EMPLOYEE: "Użytkownik podstawowy",
  MANAGER_KW: "Kierownik Kontroli Wewnętrznej",
  MANAGER_AW: "Kierownik Audytu Wewnętrznego",
  MANAGER_TD: "Kierownik kontroli TD",
  DIRECTOR: "Dyrektor",
};

export const getRoleString = (roleEnum) => mapping[roleEnum] || "Brak roli";
