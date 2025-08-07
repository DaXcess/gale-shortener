import type { VercelRequest, VercelResponse } from '@vercel/node';

const UUID_RX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { key } = req.query;

	if (typeof key !== 'string') {
		return res.status(400).send('Invalid profile code');
	}

	if (!UUID_RX.test(key)) {
		return res.status(400).send('Invalid profile code');
	}

	const response = await fetch(`https://thunderstore.io/api/experimental/legacyprofile/get/${key}`);

	if (!response.ok) {
		if (response.status === 404) {
			return res.status(404).send('Profile not found');
		}

		return res.status(500).send('Could not retrieve profile info');
	}

	const text = await response.text();
	const buffer = Buffer.from(text.substring(10), 'base64');

	res.status(200).send(buffer);
}
