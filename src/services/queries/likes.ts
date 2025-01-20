import {client} from '$services/redis';
import {itemsKey, usersLikesKey} from '$services/keys';
import { getItems } from './items';

export const userLikesItem = async (itemId: string, userId: string) => {

    return client.sIsMember(usersLikesKey(userId), itemId)

};

export const likedItems = async (userId: string) => {

    const ids = await client.sMembers(usersLikesKey(userId));

    return getItems(ids)

};

export const likeItem = async (itemId: string, userId: string) => {

    const inserted = await client.sAdd(usersLikesKey(userId), itemId);

    if(inserted) {

        await client.hIncrBy(itemsKey(itemId), 'likes', 1);

    }

};

export const unlikeItem = async (itemId: string, userId: string) => {

    const deleted = await client.sRem(usersLikesKey(userId), itemId);

    if(deleted) {

        await client.hIncrBy(itemsKey(itemId), 'likes', -1);


    }

};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {

    const ids = await client.sInter([usersLikesKey(userOneId), usersLikesKey(userTwoId)]);

    return getItems(ids);
};
