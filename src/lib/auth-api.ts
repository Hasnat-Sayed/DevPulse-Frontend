import { apiFetch } from "@/lib/api";
import type { ApiSuccess, LoginData, SignupInput, User } from "@/types";

export async function signup(
  input: SignupInput
): Promise<ApiSuccess<User>> {
  return apiFetch<User>("/api/auth/signup", {
    method: "POST",
    body: input,
  });
}

export async function login(
  email: string,
  password: string
): Promise<ApiSuccess<LoginData>> {
  return apiFetch<LoginData>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}
