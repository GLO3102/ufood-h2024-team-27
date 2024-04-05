import { URL, get, post, toQueryParams } from "./apiUtils.js";

export async function apiGetVisits(userId, params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    "users/" +
    userId +
    "/restaurants/visits" +
    toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiGetVisit(userId, visitId, token) {
  const address = URL + "users/" + userId + "/restaurants/visits/" + visitId;
  const headers = { authorization: token };

  return await get(address, headers);
}

export async function apiCreateVisit(
  userId,
  restaurantId,
  comment,
  rating,
  date,
  token,
) {
  const address = URL + "users/" + userId + "/restaurants/visits";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({
    restaurant_id: restaurantId,
    comment: comment,
    rating: rating,
    date: date,
  });

  return await post(address, headers, body);
}

export async function apiGetVisitsByRestaurant(
  userId,
  restaurantId,
  params,
  token,
) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    "users/" +
    userId +
    "/restaurants/" +
    restaurantId +
    "/visits" +
    toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await get(address, headers);
}
