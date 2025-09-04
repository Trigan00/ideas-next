// app/ideas/page.tsx
import IdeasClient from "./IdeasClient";

export const metadata = {
  title: "Идеи для стартапов",
  description: "Каталог идей с фильтрацией и поиском",
};

export default async function IdeasPage() {
  return <IdeasClient />;
}
