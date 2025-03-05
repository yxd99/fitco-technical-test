import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filtersToQueryParams(
  filters?: Record<string, unknown>
): string {
  if (typeof filters === 'undefined') return '';
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== null && value !== undefined && value !== '') {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string -- we want to convert to string
      params.append(key, value.toString());
    }
  }

  return params.toString();
}
