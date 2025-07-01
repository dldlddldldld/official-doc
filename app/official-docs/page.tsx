import OfficialDocsList from "./OfficialDocsList";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">공문 목록</h1>
      <OfficialDocsList />
    </main>
  );
}