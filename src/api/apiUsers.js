import { URL, get, post, del, toQueryParams } from "./apiUtils.js";

export async function apiGetUsers(params, token) {
  const validKeys = ["limit", "page", "q"];
  const address = URL + "users" + toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiGetUser(userId, token) {
  const address = URL + "users/" + userId;
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiGetUserFavorites(userId, token, params) {
  const validKeys = ["limit", "page"];
  const address =
    URL + "users/" + userId + "/favorites" + toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiFollowUser(targetId, token) {
  const address = URL + "follow";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({ id: targetId });

  return await post(address, headers, body);
}

export async function apiUnfollowUser(targetId, token) {
  const address = URL + "follow/" + targetId;
  const headers = { authorization: token };

  return await del(address, headers);
}
