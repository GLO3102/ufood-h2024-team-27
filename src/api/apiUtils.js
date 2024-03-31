export const URL = "https://ufoodapi.herokuapp.com/";


async function _fetch(method, address, headers, body = {}) {
  let opts = { method: method, headers: headers };
  if (!["GET", "DELETE"].includes(method)) opts.body = body;
  const response = await fetch(address, opts);

  if (!response.ok) throw new APIError(await response.text());

  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function _post(address, headers, body) {
  return _fetch("POST", address, headers, body);
}

export async function _get(address, headers) {
  return _fetch("GET", address, headers);
}

export async function _delete(address, headers) {
  return _fetch("DELETE", address, headers);
}

export async function _put(address, headers, body) {
  return _fetch("PUT", address, headers, body);
}

export function _toQueryParams(obj, validKeys) {
  let output = "";
  let keysArr = Object.keys(obj).filter((key) => validKeys.includes(key));
  if (keysArr.length) output += "?";
  keysArr.forEach((key) => {
    output += key + "=";
    const value = Array.isArray(obj[key]) ? obj[key].join() : obj[key];
    output += value + "&";
  });
  return output;
}

class APIError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "APIError";
  }
}