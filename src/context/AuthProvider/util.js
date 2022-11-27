import { Api } from "services/api";

export function setUserLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
}

export async function LoginRequest(email, senha) {
  try {
    console.log(email, "Fazendo login com o email")
    const request = Api.post("/signin", {
      email,
      senha,
    });
    return request;
  } catch (error) {
    return null;
  }
}

export function SignupRequest(user) {
  const request = Api.post("/signup", user);
  return request;
}
