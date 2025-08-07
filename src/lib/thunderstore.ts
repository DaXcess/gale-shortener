import { BlobReader, BlobWriter, ZipReader } from '@zip.js/zip.js';
import YAML from 'yaml';

type Result<T, E> = { success: true; data: T } | { success: false; error: E };

export async function getImportData(key: string): Promise<Result<Manifest, string>> {
	const response = await fetch(`/api/query/${key}`);

	if (!response.ok) {
		return { success: false, error: await response.text() };
	}

	const blob = await fetch(`/api/query/${key}`).then((resp) => resp.blob());
	const reader = new BlobReader(blob);
	const zip = new ZipReader(reader, { useWebWorkers: true });

	const entries = await zip.getEntries();

	for (const entry of entries) {
		if (!entry.getData || entry.filename != 'export.r2x') continue;

		const writer = new BlobWriter();
		entry.getData(writer);

		const data = await writer.getData();
		const text = await data.text();

		const result = parseYaml(text);
		if (result) return { success: true, data: result };
	}

	return { success: false, error: 'Invalid profile data' };
}

export type Manifest = {
	community: string;
	profileName: string;
	mods: number;
};

function parseYaml(text: string): Manifest | null {
	try {
		const data = YAML.parse(text);

		if (
			!data.community ||
			!data.profileName ||
			typeof data.community !== 'string' ||
			typeof data.profileName !== 'string' ||
			!Array.isArray(data.mods)
		)
			return null;

		return {
			community: data.community,
			profileName: data.profileName,
			mods: data.mods.length
		};
	} catch {
		return null;
	}
}
