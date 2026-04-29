import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { config as loadDotenv } from 'dotenv';

import { FigmaApi, type LocalVariableCollection } from './figma-api';
import {
  TARGET_COLLECTION_NAMES,
  filterLocalTargets,
  formatFatalError,
  requireEnv,
} from './sync-helpers';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: path.resolve(scriptDir, '../.env') });

function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

function logCollections(collections: LocalVariableCollection[]) {
  console.log(`Found ${collections.length} variable collection(s):`);
  for (const collection of sortByName(collections)) {
    const modeNames = sortByName(collection.modes).map((mode) => mode.name);
    console.log(`- ${collection.name}`);
    console.log(`    modes: ${modeNames.join(', ') || '(none)'}`);
  }
}

async function main() {
  const token = requireEnv('FIGMA_VARIABLES_SYNC_TOKEN');
  const fileKey = requireEnv('FIGMA_FILE_KEY');

  const api = new FigmaApi(token);

  console.log('Fetching variable collections from file...');
  const response = await api.getLocalVariables(fileKey);

  const allCollections = Object.values(response.meta.variableCollections);
  const { matched, missingNames, availableLocalNames } = filterLocalTargets(
    allCollections,
    TARGET_COLLECTION_NAMES,
  );

  if (matched.length === 0) {
    throw new Error(
      `None of the target collections [${TARGET_COLLECTION_NAMES.join(', ')}] were found as local collections in the file. ` +
        `Available local collections: ${availableLocalNames.join(', ') || '(none)'}.`,
    );
  }

  if (missingNames.length > 0) {
    console.warn(
      `Warning: these target collections were not found as local collections and will be skipped: ${missingNames.join(', ')}.`,
    );
  }

  logCollections(matched);
  console.log('Done.');
}

main().catch((error: unknown) => {
  console.error(formatFatalError(error));
  process.exit(1);
});
