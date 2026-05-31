import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@woo:error_logs';
const MAX_LOGS = 100;

export interface ErrorLog {
  id: string;
  timestamp: string;
  screen: string;
  action: string;
  message: string;
  stack: string | null;
  extra: Record<string, unknown> | null;
}

function buildLog(
  screen: string,
  action: string,
  error: unknown,
  extra?: Record<string, unknown>
): ErrorLog {
  const err = error instanceof Error ? error : new Error(String(error));
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    screen,
    action,
    message: err.message,
    stack: err.stack ?? null,
    extra: extra ?? null,
  };
}

export async function logError(
  screen: string,
  action: string,
  error: unknown,
  extra?: Record<string, unknown>
): Promise<void> {
  try {
    const log = buildLog(screen, action, error, extra);
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const existing: ErrorLog[] = raw ? JSON.parse(raw) : [];
    const updated = [log, ...existing].slice(0, MAX_LOGS);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // silently fail — logger must never crash the app
  }
}

export async function getLogs(): Promise<ErrorLog[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function clearLogs(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
