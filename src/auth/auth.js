import { apiLogin, apiGetTokenInfo, apiSignUp, apiLogout } from "@/api/apiAuth.js";
import Cookies from "js-cookie";

export async function login(email, password) {
  try {
    const response = await apiLogin(email, password);
    if (response.token) {
      Cookies.set("user_cookie", response.token);
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserId(token) {
  try {
    const response = await apiGetTokenInfo(token);
    if (response.id) {
      return response.id;
    } else {
      throw new Error("Could not fetch token info");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function checkUserLoggedIn() {
  let loggedIn = false;
  const token = Cookies.get("user_cookie");
  if (token) {
    loggedIn = true;
  }
  return loggedIn;
}

export function logout() {
  apiLogout();
  Cookies.remove("user_cookie");

}

export async function signUp(name, email, password) {
  try {
    const response = await apiSignUp(name, email, password);

    if (response) {
      return true;
    } else {
      throw new Error(response.statusText || "Authentication failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
