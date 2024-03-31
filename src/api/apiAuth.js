import { URL, _post, _get } from "./apiUtils.js";


// POST login
export async function apiLogin(email, password) {
  const address = URL + "login";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const body = `email=${email}&password=${password}`;

  return await _post(address, headers, body);
}

// POST logout
export async function apiLogout() {
  const address = URL + "logout";

  return await _post(address, {}, "");
}

// POST signup
export async function apiSignUp(name, email, password) {
  const address = URL + "signup";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const body = `name=${name}&email=${email}&password=${password}`;

  return await _post(address, headers, body);
}

// GET tokeninfo
export async function apiGetTokenInfo(token) {
  const address = URL + "tokenInfo";
  const headers = { authorization: token };

  return await _get(address, headers);
}