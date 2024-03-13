/* eslint-disable prettier/prettier */
// the required api calls, packaged in convenient fashion
// import with 'import * as Api from "../api.js";' from whatever page you need it

const isUnsecure = true; // update once auth is added
const optUnsecure = isUnsecure?"unsecure/":""

const URL = "https://ufoodapi.herokuapp.com/"

// dummy user: "6569767db55a58e85c543213"
// dummy restaurant: "5f31fc6555d7790550c08aff"
// dummy list: "65d28a21072afacd2082fec4"
// toDelete list: "65d28add072afacd2082fecc"

/*export async function selfTest(){
    console.log(await apiRemoveFromFavoritesList("65d28a21072afacd2082fec4","5f31fc6555d7790550c08aff"))
}*/


// POST login (tp3 only)
// POST logout (tp3 only)

// POST signup (tp3 only)

// GET tokeninfo (tp3 only)

// GET restaurants
export async function apiGetRestaurants(params={}){ // send queryparams as object with either string/int or list of string/int for each key
    const validKeys = ["limit","page","q","genres","price_range","lon","lat"];
    const address = URL + optUnsecure + "restaurants" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// GET restaurants/[id]
export async function apiGetRestaurant(restaurantId){
    const address = URL + optUnsecure + "restaurants/" + restaurantId;
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// GET restaurants/[id]/visits
export async function apiGetRestaurantVisits(restaurantId,params={}){
    const validKeys = ["limit","page"];
    const address = URL + optUnsecure + "restaurants/" + restaurantId + "/visits" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}

// GET users
export async function apiGetUsers(params={}){
    const validKeys = ["limit","page","q"]
    const address = URL + optUnsecure + "users" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// GET users/[id]
export async function apiGetUser(userId){
    const address = URL + optUnsecure + "users/" + userId;
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// GET users/[id]/favorites
export async function apiGetUserFavorites(userId,params={}){
    const validKeys = ["limit","page"]
    const address = URL + optUnsecure + "users/" + userId + "/favorites" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// POST follow (tp3 only)
/*export async function apiFollowUser(targetId){
    const address = URL + optUnsecure + "follow";
    const headers = {'authorization': null, // add in tp3
                     'content-type': "application/json"};
    const body = JSON.stringify({id: targetId});

    return await _post(address, headers, body);
}*/
// DELETE follow/[id] (tp3 only)
/*export async function apiUnfollowUser(targetId){
    const address = URL + optUnsecure + "follow/" + targetId;
    const headers = {'authorization': null} // add in tp3

    return await _delete(address, headers);
}*/

// GET users/[id]/restaurants/visits
export async function apiGetVisits(userId,params={}){
    const validKeys = ["limit","page"]
    const address = URL + optUnsecure + "users/" + userId + "/restaurants/visits" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// GET users/[id]/restaurants/visits/[id]
export async function apiGetVisit(userId,visitId){
    const address = URL + optUnsecure + "users/" + userId + "/restaurants/visits/" + visitId;
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// POST users/[id]/restaurants/visits
export async function apiCreateVisit(userId, restaurantId, comment, rating, date){ // might refactor that into a single {review} object or sth
    const address = URL + optUnsecure + "users/" + userId + "/restaurants/visits";
    const headers = {'authorization': null, // add in tp3
                     'content-type': "application/json"};
    const body = JSON.stringify({restaurant_id: restaurantId, comment: comment, rating: rating, date: date})

    return await _post(address, headers, body);
}
// GET users/[id]/restaurants/[id]/visits
export async function apiGetVisitsByRestaurant(userId,restaurantId,params={}){
    const validKeys = ["limit","page"]
    const address = URL + optUnsecure + "users/" + userId + "/restaurants/" + restaurantId + "/visits" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}

// GET favorites
export async function apiGetFavoritesLists(params={}){
    const validKeys = ["limit","page"]
    const address = URL + optUnsecure + "favorites" + _toQueryParams(params,validKeys);
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// GET favorites/[id]
export async function apiGetFavoritesList(listId){ // see the thing is, lists and users are 100% independant
    const address = URL + optUnsecure + "favorites/" + listId;
    const headers = {'authorization': null} // add in tp3

    return await _get(address, headers);
}
// POST favorites
export async function apiCreateFavoritesList(listName,ownerAddress='marc@ufood.com'){ // remember to stop using owner once auth tokens are added
    const address = URL + optUnsecure + "favorites";
    const headers = {'authorization': null, // add in tp3
                     'content-type': "application/json"};
    const body = JSON.stringify({name: listName, owner: ownerAddress})

    return await _post(address, headers, body);
}
// PUT favorites/[id]
export async function apiEditFavoritesList(listId,newListName,newOwnerAddress='marc@ufood.com'){ // remember to stop using owner once auth tokens are added
    const address = URL + optUnsecure + "favorites/"+listId;
    const headers = {'authorization': null, // add in tp3
                     'content-type': "application/json"};
    const body = JSON.stringify({name: newListName, owner: newOwnerAddress})

    return await _put(address, headers, body);
}
// DELETE favorites/[id]
export async function apiDeleteFavoritesList(listId){ // server returns 500 for now
    const address = URL + optUnsecure + "favorites/" + listId;
    const headers = {'authorization': null} // add in tp3

    return await _delete(address, headers);
}
// POST favorites/[id]/restaurants
export async function apiAddToFavoritesList(listId,restaurantId){
    const address = URL + optUnsecure + "favorites/" + listId + "/restaurants";
    const headers = {'authorization': null, // add in tp3
                     'content-type': "application/json"};
    const body = JSON.stringify({id: restaurantId})

    return await _post(address, headers, body);
}
// DELETE favorites/[id]/restaurants/[id]
export async function apiRemoveFromFavoritesList(listId,restaurantId){ // also returns 500
    const address = URL + optUnsecure + "favorites/" + listId + "/restaurants/" + restaurantId;
    const headers = {'authorization': null} // add in tp3

    return await _delete(address, headers);
}


// util
async function _fetch(method,address,headers,body={}){
    let opts = {method:method,headers:headers};
    if(!["GET","DELETE"].includes(method)) opts.body=body;
    const response = await fetch(address, 
        opts);

    if(!response.ok)
        throw new APIError(await response.text());

    const jsonResponse = await response.json();
    return jsonResponse;
}

async function _post(address,headers,body){
    return _fetch("POST",address,headers,body);
}

async function _get(address,headers){
    return _fetch("GET",address,headers);
}

async function _delete(address,headers){
    return _fetch("DELETE",address,headers);
}

async function _put(address,headers,body){
    return _fetch("PUT",address,headers,body);
}

function _toQueryParams(obj,validKeys){
    let output = "";
    let keysArr = Object.keys(obj).filter((key)=>validKeys.includes(key));
    if(keysArr.length)
        output+="?"
    keysArr.forEach((key)=>{
        output+=key+"=";
        const value = Array.isArray(obj[key])?obj[key].join():obj[key];
        output+=value+"&"; // trailing & is harmless
    })
    return output;
}

class APIError extends Error{
    constructor(msg){
        super(msg);
        this.name="APIError";
    }
}