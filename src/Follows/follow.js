import { apiGetUser, apiUnfollowUser, apiFollowUser } from "@/api/apiUsers.js";

export async function getFollowings(userId, token) {
  try {
    const response = await apiGetUser(userId, token);

    if (response.following) {
      return response.following;
    } else {
      throw new Error("Couldnt fetch followings");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFollowers(userId, token) {
  try {
    const response = await apiGetUser(userId, token);

    if (response.followers) {
      return response.followers;
    } else {
      throw new Error("Couldnt fetch followers");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function follow(followId, token) {
  try {
    await apiFollowUser(followId, token);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function unfollow(unfollowId, token) {
  try {
    await apiUnfollowUser(unfollowId, token);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
