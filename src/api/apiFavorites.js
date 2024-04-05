import { URL, get, post, put, del, toQueryParams } from "./apiUtils.js";

export async function apiGetFavoritesLists(params, token) {
  const validKeys = ["limit", "page"];
  const address = URL + "favorites" + toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiGetFavoritesList(listId, token) {
  const address = URL + "favorites/" + listId;
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiCreateFavoritesList(listName, token) {
  const address = URL + "favorites";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({ name: listName });

  return await post(address, headers, body);
}

export async function apiEditFavoritesList(listId, newListName, token) {
  const address = URL + "favorites/" + listId;
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({ name: newListName });

  return await put(address, headers, body);
}

export async function apiDeleteFavoritesList(listId, token) {
  const address = URL + "favorites/" + listId;
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };

  return await del(address, headers);
}

export async function apiAddToFavoritesList(listId, restaurantId, token) {
  const address = URL + "favorites/" + listId + "/restaurants";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({ id: restaurantId });

  return await post(address, headers, body);
}

export async function apiRemoveFromFavoritesList(listId, restaurantId, token) {
  const address = URL + "favorites/" + listId + "/restaurants/" + restaurantId;
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };

  return await del(address, headers);
}
