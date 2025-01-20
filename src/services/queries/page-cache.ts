import { client } from "$services/redis";
import { pageCacheKey } from "$services/keys";

const cachedRoutes = [
    '/about',
    '/privacy',
    '/sign/signin',
    '/sign/signup',
];


export const getCachedPage = (route: string) => {

    if (cachedRoutes.includes(route)) {

        return client.get(pageCacheKey(route));

    }

    return null;
};

export const setCachedPage = (route: string, page: string) => {

    if (cachedRoutes.includes(route)) {

        return client.set(pageCacheKey(route), page, {
            EXAT: 2,
        })

    }

};
