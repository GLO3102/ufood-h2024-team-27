const isUnsecure = false; // update once auth is added
const optUnsecure = isUnsecure ? "unsecure/" : "";

const URL = "https://ufoodapi.herokuapp.com/";

/*
    Test user: "wasd bob", "wasd@bob.com", "pass"
*/

// POST login
export async function apiLogin(email, password){
  const address = URL + "login";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const body = `email=${email}&password=${password}`;
  return await _post(address, headers, body);
}
// POST logout
export async function apiLogout(){
  const address = URL + "logout";
  return await _post(address,{},""); // redirect to /login somehow
}

// POST signup
export async function apiSignUp(name, email, password){
  const address = URL + "signup";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const body = `name=${name}&email=${email}&password=${password}`;
  return await _post(address, headers, body);
}

// GET tokeninfo
export async function apiGetTokenInfo(token) {
  const address = URL + "tokenInfo";
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET restaurants
export async function apiGetRestaurants(params, token) {
  // send queryparams as object with either string/int or list of string/int for each key (ex: {a:"A", b:10, c:["B","C"]})
  const validKeys = ["limit", "page", "q", "genres", "price_range", "lon", "lat"];
  const address = URL + optUnsecure + "restaurants" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };
  return await _get(address, headers);
}
// GET restaurants/[id]
export async function apiGetRestaurant(restaurantId, token) {
  const address = URL + optUnsecure + "restaurants/" + restaurantId;
  const headers = { authorization: token };

  return await _get(address, headers);
}
// GET restaurants/[id]/visits
export async function apiGetRestaurantVisits(restaurantId, params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    optUnsecure +
    "restaurants/" +
    restaurantId +
    "/visits" +
    _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET users
export async function apiGetUsers(params, token) {
  const validKeys = ["limit", "page", "q"];
  const address =
    URL + optUnsecure + "users" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}
// GET users/[id]
export async function apiGetUser(userId, token) {
  const address = URL + optUnsecure + "users/" + userId;
  const headers = { authorization: token };

  return await _get(address, headers);
}
// GET users/[id]/favorites
export async function apiGetUserFavorites(userId, params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL +
    optUnsecure +
    "users/" +
    userId +
    "/favorites" +
    _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}
// POST follow (untested because I don't know how I would test?)
export async function apiFollowUser(targetId, token){
  const address = URL + optUnsecure + "follow";
  const headers = {'authorization': token,
                   'content-type': "application/json"};
  const body = JSON.stringify({id: targetId});

  return await _post(address, headers, body);
}
// DELETE follow/[id] (tp3 only)
export async function apiUnfollowUser(targetId, token){
  const address = URL + optUnsecure + "follow/" + targetId;
  const headers = {'authorization': token}

  return await _delete(address, headers);
}

// GET users/[id]/restaurants/visits // The params argument was there because limit=N is also a valid query param, I don't know what this breaks though
export async function apiGetVisits(userId, params, token) {
  const validKeys = ["limit", "page"];
  const address = URL + optUnsecure + "users/" + userId + "/restaurants/visits" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}

// GET users/[id]/restaurants/visits/[id]
export async function apiGetVisit(userId, visitId, token) {
  const address =
    URL + optUnsecure + "users/" + userId + "/restaurants/visits/" + visitId;
  const headers = { authorization: token };
  return await _get(address, headers);
}
// POST users/[id]/restaurants/visits
export async function apiCreateVisit(userId, restaurantId, comment, rating, date, token) {
  // might refactor that into a single {review} object or sth
  const address = URL + optUnsecure + "users/" + userId + "/restaurants/visits";
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
    optUnsecure +
    "users/" +
    userId +
    "/restaurants/" +
    restaurantId +
    "/visits" +
    _toQueryParams(params, validKeys);
  const headers = { authorization: token };
  return await _get(address, headers);
}

// GET favorites
export async function apiGetFavoritesLists(params, token) {
  const validKeys = ["limit", "page"];
  const address =
    URL + optUnsecure + "favorites" + _toQueryParams(params, validKeys);
  const headers = { authorization: token };

  return await _get(address, headers);
}
// GET favorites/[id]
export async function apiGetFavoritesList(listId, token) {
  // see the thing is, lists and users are 100% independant
  const address = URL + optUnsecure + "favorites/" + listId;
  const headers = { authorization: token };

  return await _get(address, headers);
}
// POST favorites
export async function apiCreateFavoritesList(listName, token) {
  const address = URL + optUnsecure + "favorites";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const owner = JSON.parse(await apiGetTokenInfo(token)).address;
  const body = JSON.stringify({ name: listName, owner: owner });

  return await _post(address, headers, body);
}
// PUT favorites/[id]
export async function apiEditFavoritesList(listId, newListName, token) {
  const address = URL + optUnsecure + "favorites/" + listId;
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const owner = JSON.parse(await apiGetTokenInfo(token)).address;
  const body = JSON.stringify({ name: newListName, owner: owner });

  return await _put(address, headers, body);
}
// DELETE favorites/[id]
export async function apiDeleteFavoritesList(listId, token) {
  // server should stop returning 500
  const address = URL + optUnsecure + "favorites/" + listId;
  const headers = { authorization: token };

  return await _delete(address, headers);
}
// POST favorites/[id]/restaurants
export async function apiAddToFavoritesList(listId, restaurantId, token) {
  const address = URL + optUnsecure + "favorites/" + listId + "/restaurants";
  const headers = {
    authorization: token,
    "content-type": "application/json",
  };
  const body = JSON.stringify({ id: restaurantId });

  return await _post(address, headers, body);
}
// DELETE favorites/[id]/restaurants/[id]
export async function apiRemoveFromFavoritesList(listId, restaurantId, token) {
  // also should no longer return 500
  const address =
    URL + optUnsecure + "favorites/" + listId + "/restaurants/" + restaurantId;
  const headers = { authorization: token };

  return await _delete(address, headers);
}

// util
async function _fetch(method, address, headers, body = {}) {
  let opts = { method: method, headers: headers };
  if (!["GET", "DELETE"].includes(method)) opts.body = body;
  const response = await fetch(address, opts);

  if (!response.ok) throw new APIError(await response.text());

  const jsonResponse = await response.json();
  return jsonResponse;
}

async function _post(address, headers, body) {
  return _fetch("POST", address, headers, body);
}

async function _get(address, headers) {
  return _fetch("GET", address, headers);
}

async function _delete(address, headers) {
  return _fetch("DELETE", address, headers);
}

async function _put(address, headers, body) {
  return _fetch("PUT", address, headers, body);
}

function _toQueryParams(obj, validKeys) {
  let output = "";
  let keysArr = Object.keys(obj).filter((key) => validKeys.includes(key));
  if (keysArr.length) output += "?";
  keysArr.forEach((key) => {
    output += key + "=";
    const value = Array.isArray(obj[key]) ? obj[key].join() : obj[key];
    output += value + "&"; // trailing & is harmless
  });
  return output;
}

class APIError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "APIError";
  }
}
