import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {

    const comands = [1,2,3].map((id)=>{
        return client.hGetAll('car' + id)
    })

    const result = await Promise.all(comands)

};
run();
