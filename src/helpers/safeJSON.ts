export default function safeJSON<T>(val: string, fallback: T): T {
  try {
    const v = JSON.parse(val);
    return v ?? fallback;
  } catch {
    return (val as unknown as T) ?? fallback;
  }
}
