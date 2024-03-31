import { URL, _get, _post, _put, _delete, _toQueryParams } from "./apiUtils.js";


// GET favorites
export async function apiGetFavoritesLists(params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL + "favorites" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET favorites/[id]
export async function apiGetFavoritesList(listId, token) {
  const address = URL + "favorites/" + listId;
  const headers = { authorization: token };

  return await _get(address, headers);
}

// POST favorites
export async function apiCreateFavoritesList(listName, token) {
  const address = URL + "favorites";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const response = await apiGetTokenInfo(token);
  const owner = response.address;
  const body = JSON.stringify({ name: listName, owner: owner });

  return await _post(address, headers, body);
}

// PUT favorites/[id]
export async function apiEditFavoritesList(listId, newListName, token) {
  const address = URL + "favorites/" + listId;
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const response = await apiGetTokenInfo(token);
  const owner = response.address;
  const body = JSON.stringify({ name: newListName, owner: owner });

  return await _put(address, headers, body);
}

// DELETE favorites/[id]
export async function apiDeleteFavoritesList(listId, token) {
  const address = URL + "favorites/" + listId;
  const headers = { authorization: token };

  return await _delete(address, headers);
}

// POST favorites/[id]/restaurants
export async function apiAddToFavoritesList(listId, restaurantId, token) {
  const address = URL + "favorites/" + listId + "/restaurants";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({ id: restaurantId });

  return await _post(address, headers, body);
}

// DELETE favorites/[id]/restaurants/[id]
export async function apiRemoveFromFavoritesList(listId, restaurantId, token) {
  const address = URL + "favorites/" + listId + "/restaurants/" + restaurantId;
  const headers = { authorization: token };

  return await _delete(address, headers);
}
