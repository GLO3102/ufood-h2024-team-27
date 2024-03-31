import { URL, _get, _post, _delete, _toQueryParams } from "./apiUtils.js";


// GET users
export async function apiGetUsers(params, token) {
  const validKeys = ["limit", "page", "q"];
  const address =
    URL + "users" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET users/[id]
export async function apiGetUser(userId, token) {
  const address = URL + "users/" + userId;
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET users/[id]/favorites
export async function apiGetUserFavorites(userId, token, params) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    "users/" +
    userId +
    "/favorites" +
    _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// POST follow
export async function apiFollowUser(targetId, token) {
  const address = URL + "follow";
  const headers = {
    'authorization': token,
    'content-type': "application/json"
  };
  const body = JSON.stringify({ id: targetId });

  return await _post(address, headers, body);
}

// DELETE follow/[id]
export async function apiUnfollowUser(targetId, token) {
  const address = URL + "follow/" + targetId;
  const headers = { 'authorization': token }

  return await _delete(address, headers);
}
