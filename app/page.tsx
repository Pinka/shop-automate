import { AppHeader } from "./components/AppHeader";
import { PrintifyProductList } from "./components/PrintifyProductList";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  return (
    <main>
      <AppHeader />
      <PrintifyProductList page={page} />
    </main>
  );
}
