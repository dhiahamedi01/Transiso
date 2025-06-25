'use client';

import { Box, Pagination } from '@mui/material';
import { useState } from 'react';
import ProductCard from '../TrendingCarousel/ProductCard';
import { products } from './Data_produit';

const ITEMS_PER_PAGE = 12;
const ITEMS_PER_ROW_DESKTOP = 4;  // 4 cartes par ligne desktop

export default function ProductList() {
  const [page, setPage] = useState(1);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedProducts = products.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 6, mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent:
            paginatedProducts.length < ITEMS_PER_ROW_DESKTOP
              ? 'center'
              : 'flex-start',
          rowGap: 5,
          columnGap: {
            xs: 2,
            sm: 3,
            md: 2,
          },
        }}
      >
        {paginatedProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              boxSizing: 'border-box',
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: {
                xs: '100%',          // 1 carte par ligne en mobile
                sm: `calc(50% - 12px)`, // 2 cartes par ligne sur tablette
                md: `calc(25% - 16px)`, // 4 cartes par ligne sur desktop
              },
              maxWidth: {
                xs: '100%',
                sm: `calc(50% - 12px)`,
                md: 'none',
              },
              p: 1,
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(products.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
}