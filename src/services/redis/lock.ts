import { randomBytes } from "crypto";
import { client } from "./client";

export const withLock = async (key: string, cb: (signal: any) => any) => {

	const retryDelayMs = 100;
	let retries = 20;

	const token = randomBytes(6).toString('hex');
	const lockKey = `lock:${key}`

	while (retries >= 0) {

		retries--;

		const acquired = await client.set(lockKey, token, {
			NX: true,
			PX: 2000,
		})

		if (!acquired) {

			await pause(retryDelayMs);
			continue;
		}



		try {
			const sginal = { expired: false };

			setTimeout(() => {
				sginal.expired = true;
			}, 2000);
			
			const result = await cb(sginal);
			return result;

		} finally {

			await client.unlock(lockKey, token);
		}


	}

};

const buildClientProxy = () => { };

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
