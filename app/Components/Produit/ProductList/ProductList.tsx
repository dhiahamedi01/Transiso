'use client';

import { Box, Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import ProductCard from '../TrendingCarousel/ProductCard';
import { Product } from './Data_produit';

type Props = {
  products: Product[];
  currentPage: number;
  totalPages: number;
};

export default function ProductList({ products, currentPage, totalPages }: Props) {
  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 6, mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: products.length < 4 ? 'center' : 'flex-start',
          rowGap: 5,
          columnGap: { xs: 2, sm: 3, md: 2 },
        }}
      >
        {products.map(product => (
          <Box
            key={product.id}
            sx={{
              boxSizing: 'border-box',
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 16px)' },
              maxWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'none' },
              p: 1,
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={`?page=${item.page}`}
              {...item}
            />
          )}
        />
      </Box>
    </Box>
  );
}
