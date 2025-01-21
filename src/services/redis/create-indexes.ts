import { itemsIndexeKey, itemsKey } from "$services/keys";
import { client } from "./client";
import { SchemaFieldTypes } from "redis";

export const createIndexes = async () => {

    const indexes = await client.ft._list();

    const exists = indexes.find(index => index === itemsIndexeKey());

    if(exists) return ;
    
    return await client.ft.create(
        itemsIndexeKey(),
        {
            name: {
                type: SchemaFieldTypes.TEXT
            },
            description: {
                type: SchemaFieldTypes.TEXT
            }
        },
        {
            ON: 'HASH',
            PREFIX: itemsKey('')
        }
    );

};
