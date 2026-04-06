import { Platform } from 'react-native';
import type { DatabaseAdapter } from './webStorage';

export type { DatabaseAdapter };

let _db: DatabaseAdapter | null = null;

export async function getDatabase(): Promise<DatabaseAdapter> {
  if (_db) return _db;
  if (Platform.OS === 'web') {
    const { getWebDatabase } = await import('./webStorage');
    _db = getWebDatabase();
  } else {
    const { getDatabase: getNativeDb } = await import('./schema');
    _db = (await getNativeDb()) as unknown as DatabaseAdapter;
  }
  return _db;
}
