import { client } from "$services/redis";
import { deserialize } from "./deserialize";
import { itemsIndexeKey } from "$services/keys";

export const searchItems = async (term: string, size: number = 5) => {

    const cleaned = term
        .replaceAll(/[^a-zA-Z0-9]/g, '')
        .trim()
        .split(' ')
        .map((word) => word ? `%${word}%` : '')
        .join(' ')


    if(cleaned === '') {
        return []
    }

    const results = await client.ft.search(
        itemsIndexeKey(),
        cleaned,
        {
            LIMIT : {
                from : 0,
                size,
            }
        }
        
    )

    return results.documents.map(({id, value})=> deserialize(id, value as any))

};
