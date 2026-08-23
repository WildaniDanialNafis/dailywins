export function getSafeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function validateLoginForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return {
      email: null,
      error: "Masukkan email terlebih dahulu.",
    };
  }

  if (!normalizedEmail.includes("@")) {
    return {
      email: null,
      error: "Masukkan alamat email yang valid.",
    };
  }

  if (!password) {
    return {
      email: null,
      error: "Masukkan password terlebih dahulu.",
    };
  }

  return {
    email: normalizedEmail,
    error: null,
  };
}
