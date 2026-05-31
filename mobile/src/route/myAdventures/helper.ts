import { AdventureLog } from '@/redux/slices/AdventureLogSlice';

export function formatCardDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

export function isEmpty(logs: AdventureLog[]): boolean {
  return logs.length === 0;
}
