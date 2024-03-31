import { URL, _get, _toQueryParams } from "./apiUtils.js"


// GET restaurants
export async function apiGetRestaurants(params, token) {
  const validKeys = ["limit", "page", "q", "genres", "price_range", "lon", "lat"];
  const address = URL + "restaurants" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET restaurants/[id]
export async function apiGetRestaurant(restaurantId, token) {
  const address = URL + "restaurants/" + restaurantId;
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET restaurants/[id]/visits
export async function apiGetRestaurantVisits(restaurantId, params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL + "restaurants/" + restaurantId + "/visits" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}