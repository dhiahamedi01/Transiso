import React from 'react'
import Hero from '../Components/Feauture/Hero/Hero'
import ProductList from '../Components/Produit/ProductList/ProductList'
import { products } from '../Components/Produit/ProductList/Data_produit'

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams?: { page?: string };
};

export default function Page({ searchParams }: Props) {
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Découpe les produits pour la page demandée
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
