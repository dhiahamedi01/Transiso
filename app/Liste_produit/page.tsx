import Hero from '@/Components/Feauture/Hero/Hero';
import ProductList from '@/Components/Produit/ProductList/ProductList';
import { products } from '@/Components/Produit/ProductList/Data_produit';

const ITEMS_PER_PAGE = 12;

type SearchParams = Record<string, string | string[] | undefined>;

export default function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {

  const rawPage =
    Array.isArray(searchParams?.page) ? searchParams?.page[0] : searchParams?.page;

  const currentPage = parseInt(rawPage ?? '1', 10);
  const totalPages  = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage       * ITEMS_PER_PAGE
  );

  return (
    <>
      <Hero />
      <ProductList
        products={paginatedProducts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
