import { ProductList } from "./ProductList";
import { getProductsByPage } from "./actions";
import { selectProduct } from "./actions";

export const Products: React.FC<{
  page?: number;
  selectedProduct?: string;
}> = async ({ page = 1, selectedProduct }) => {
  const products = await getProductsByPage(page);

  return (
    <form action={selectProduct}>
      <ProductList products={products} selectedProduct={selectedProduct} />
    </form>
  );
};
