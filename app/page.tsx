import DataGrid from "./component/DataGrid";
import { dataGridMock } from "./mockData";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DataGrid data={dataGridMock} />
    </main>
  );
}
