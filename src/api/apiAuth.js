import { URL, post, get } from "./apiUtils.js";

export async function apiLogin(email, password) {
  const address = URL + "login";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const body = `email=${email}&password=${password}`;

  return await post(address, headers, body);
}

export async function apiLogout() {
  const address = URL + "logout";

  return await post(address, {}, "");
}

export async function apiSignUp(name, email, password) {
  const address = URL + "signup";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const body = `name=${name}&email=${email}&password=${password}`;

  return await post(address, headers, body);
}

export async function apiGetTokenInfo(token) {
  const address = URL + "tokenInfo";
  const headers = { authorization: token };

  return await get(address, headers);
}
