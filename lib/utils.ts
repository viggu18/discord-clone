import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface querystringParams {
  url: string;
  query: Record<string, string>;
}

export function querystring({ url, query }: querystringParams): string {
  const SearchParams = new URLSearchParams();

  Object.entries(query).forEach((item) =>
    SearchParams.append(item[0], item[1])
  );

  return `${url}?${SearchParams.toString()}`;
}
