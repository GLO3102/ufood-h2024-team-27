import * as api from '@/api/apiUsers.js'

export async function getFollowings(userId, token){
    try {
        const response = await api.apiGetUser(userId, token);
    
        if (response.following) {
          return response.following;
        } else {
          throw new Error('Couldnt fetch followings');
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export async function getFollowers(userId, token){
    try {
        const response = await api.apiGetUser(userId, token);
    
        if (response.followers) {
          return response.followers;
        } else {
          throw new Error('Couldnt fetch followers');
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export async function unfollow(unfollowId, token){
    try {
        await api.apiUnfollowUser(unfollowId, token);
      } catch (error) {
        console.error(error);
        throw error;
      }
}
