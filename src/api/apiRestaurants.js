import { URL, get, toQueryParams } from "./apiUtils.js";

export async function apiGetRestaurants(params, token) {
  const validKeys = [
    "limit",
    "page",
    "q",
    "genres",
    "price_range",
    "lon",
    "lat",
  ];
  const address = URL + "restaurants" + toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiGetRestaurant(restaurantId, token) {
  const address = URL + "restaurants/" + restaurantId;
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiGetRestaurantVisits(restaurantId, params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    "restaurants/" +
    restaurantId +
    "/visits" +
    toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}
