export default function shortenUrl(url: string, maxLength = 30) {
  if (url.length <= maxLength) return url;
  const start = url.slice(0, 20);
  const end = url.slice(-7);
  return `${start}...${end}`;
}
