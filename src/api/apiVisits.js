import { URL, _get, _post, _toQueryParams } from "./apiUtils.js";


// GET users/[id]/restaurants/visits
export async function apiGetVisits(userId, params, token) {
  const validKeys = ["limit", "page"];
  const address = URL + "users/" + userId + "/restaurants/visits" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET users/[id]/restaurants/visits/[id]
export async function apiGetVisit(userId, visitId, token) {
  const address =
    URL + "users/" + userId + "/restaurants/visits/" + visitId;
  const headers = { authorization: token };

  return await _get(address, headers);
}

// POST users/[id]/restaurants/visits
export async function apiCreateVisit(userId, restaurantId, comment, rating, date, token) {
  const address = URL + "users/" + userId + "/restaurants/visits";
  const headers = {
    authorization: token,
    "content-type": "application/json"
  };
  const body = JSON.stringify({
    restaurant_id: restaurantId,
    comment: comment,
    rating: rating,
    date: date,
  });

  return await _post(address, headers, body);
}

// GET users/[id]/restaurants/[id]/visits
export async function apiGetVisitsByRestaurant(userId, restaurantId, params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    "users/" +
    userId +
    "/restaurants/" +
    restaurantId +
    "/visits" +
    _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}