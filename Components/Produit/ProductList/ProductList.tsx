'use client';

import {
  Box,
  Pagination,
  InputBase,
  Select,
  MenuItem,
  Paper,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useMemo } from 'react';
import ProductCard from '../TrendingCarousel/ProductCard';
import { products } from './Data_produit';

const ITEMS_PER_PAGE = 12;
const ITEMS_PER_ROW_DESKTOP = 4;

const categories = [
  'الكل',
  'مكائن خياطة',
  'ألواح خشبية',
  'دهانات خارجية',
  'حاويات بلاستيكية',
  'مبردات هواء',
  'إطارات سيارات',
  'فولاذ مجلفن',
  'أخشاب معالجة',
  'زيت نباتي خام',
  'آلات تعبئة وتغليف'
];

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('الكل');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Optimisation avec useMemo
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchTitle = product.title.includes(search);
      const matchCategory = category === 'الكل' || product.title.includes(category);
      return matchTitle && matchCategory;
    });
  }, [search, category]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredProducts, page]);

  return (
    <Box sx={{ px: { xs: 3, sm: 6, md: 10 }, py: 6, mt: 3 }}>

      {/* Header - recherche + filtre */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
          direction:'ltr',
          px: { xs: 1, md: 0 },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontWeight: 600,
            fontSize: 20,
            color: '#0C3547',
          }}
        >
          استعرض المنتجات
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              backgroundColor: '#fff',
              border:'1px solid #e0e0e0',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              px: 2,
              height: 42,
              width: { xs: '100%', sm: 250 },
              direction:'ltr',
            }}
          >
            <SearchIcon sx={{ color: '#153B4C', mr: 1 }} />
            <InputBase
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page au changement de recherche
              }}
              fullWidth
              sx={{
                color: '#333',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                '::placeholder': { color: '#999' }
              }}
            />
          </Paper>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 0.5,
              backgroundColor: '#0C3547',
              borderRadius: '4px',
              height: 42,
            }}
          >
            <FilterListIcon sx={{ color: '#fff' }} />
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1); // reset page au changement de catégorie
              }}
              size="small"
              variant="standard"
              disableUnderline
              sx={{
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
              }}
            >
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>

      {/* Si pas de résultat, afficher image + message */}
      {filteredProducts.length === 0 ? (
        <Box
          sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            px: 3,
            height:'50vh',
            marginBottom:'80px'
          }}
        >
          <Box
            component="img"
            src="/img/icon/no_data.png" // Change ce lien par ta propre image
            alt="No data"
            sx={{
              width: isMobile ? '80%' : '300px',
              maxWidth: '100%',
              opacity: 0.7,
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: 18,
              color: '#0C3547',
              fontWeight: 500,
              textAlign: 'center',
              maxWidth: 400,
            }}
          >
            للأسف، لم يتم العثور على منتجات تطابق بحثك.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Liste des produits */}
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
                    xs: '100%',
                    sm: `calc(50% - 12px)`,
                    md: `calc(25% - 16px)`,
                  },
                  maxWidth: {
                    xs: '100%',
                    sm: `calc(50% - 12px)` ,
                    md: 'none',
                  },
                  p: 1,
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handleChange}
              color="primary"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
