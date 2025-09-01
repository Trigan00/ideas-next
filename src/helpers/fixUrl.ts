export default function fixUrl(url: string): string {
  const wwwIndex = url.indexOf("www.");
  if (wwwIndex !== -1) {
    url = url.slice(wwwIndex); // оставляем от www
    // добавляем протокол
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
  }
  return url;
}
