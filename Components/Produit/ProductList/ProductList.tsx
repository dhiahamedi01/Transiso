'use client';

import {
  Box, Pagination, InputBase, Select, MenuItem, Paper,
  useMediaQuery, useTheme, Typography, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ProductCard from '../TrendingCarousel/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const ITEMS_PER_PAGE = 15; // 3 lignes de 5 cartes
const ITEMS_PER_ROW_DESKTOP = 5;

export default function ProductList() {
  const { t, i18n } = useTranslation(['common']);
  const categories = t('productList.categories', { returnObjects: true }) as string[];
  const direction = i18n.dir();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState(categories[0]);

  const { products, loading, error } = useProducts();

  useEffect(() => {
    setCat(categories[0]);
  }, [categories]);

  const localisedProducts = useMemo(() => {
    return products.map(p => ({
      ...p,
      title: p.name,
      description: p.description || '',
      category: p.category,
      image: p.image1 || '',
      price: Number(p.price),
      oldPrice: p.old_price ? Number(p.old_price) : undefined,
      stock: p.stock,
      rating: 5,
    }));
  }, [products, i18n.language]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return localisedProducts.filter(prod => {
      const matchTitle = prod.title.toLowerCase().includes(term);
      const matchCat = cat === categories[0] || prod.category === cat;
      return matchTitle && matchCat;
    });
  }, [search, cat, localisedProducts, categories]);

  const paginated = useMemo(
    () => filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [filtered, page]
  );

  return (
    <Box
      sx={{
        px: { xs: 3, sm: 6, md: 10 },
        py: 6,
        mt: 3,
        direction,
        fontFamily: direction === 'rtl' ? 'Noto Kufi Arabic, sans-serif' : 'Arial, sans-serif'
      }}
    >
      {/* En-tête */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
          direction,
          px: { xs: 1, md: 0 }
        }}
      >
        <Typography
          sx={{
            fontFamily: direction === 'rtl' ? 'Noto Kufi Arabic, sans-serif' : 'Arial, sans-serif',
            fontWeight: 600,
            fontSize: 20,
            color: '#0C3547',
            textAlign: direction === 'rtl' ? 'right' : 'left',
          }}
        >
          {t('productList.title')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Recherche */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              height: 42,
              width: { xs: '100%', sm: 250 },
              borderRadius: '4px',
              bg: '#fff',
              border: '1px solid #e0e0e0',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              direction,
            }}
          >
            <SearchIcon sx={{ color: '#153B4C', mr: 1 }} />
            <InputBase
              placeholder={t('productList.searchPlaceholder')}
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              fullWidth
              sx={{
                color: '#333',
                fontFamily: direction === 'rtl' ? 'Noto Kufi Arabic, sans-serif' : 'Arial, sans-serif',
                '::placeholder': { color: '#999' },
                textAlign: direction === 'rtl' ? 'right' : 'left',
              }}
            />
          </Paper>

          {/* Filtre Catégorie */}
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
              direction,
            }}
          >
            <FilterListIcon sx={{ color: '#fff' }} />
            <Select
              value={cat}
              onChange={e => {
                setCat(e.target.value as string);
                setPage(1);
              }}
              size="small"
              variant="standard"
              disableUnderline
              sx={{
                fontFamily: direction === 'rtl' ? 'Noto Kufi Arabic, sans-serif' : 'Arial, sans-serif',
                color: 'white',
                '& .MuiSelect-icon': { color: 'white' },
                textAlign: direction === 'rtl' ? 'right' : 'left',
              }}
            >
              {categories.map((c, i) => (
                <MenuItem key={i} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>

      {/* Contenu */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography sx={{ color: 'red', textAlign: 'center', mt: 4 }}>
          {t('productList.error', { defaultValue: 'Erreur lors du chargement.' })}
        </Typography>
      ) : filtered.length === 0 ? (
        <Box
          sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            px: 3,
            height: '50vh',
            mb: '80px',
            direction,
          }}
        >
          <Box
            component="img"
            src="/img/icon/no_data.png"
            alt="no data"
            sx={{ width: isMobile ? '80%' : '300px', opacity: 0.7 }}
          />
          <Typography
            sx={{
              fontFamily: direction === 'rtl' ? 'Noto Kufi Arabic, sans-serif' : 'Arial, sans-serif',
              fontSize: 18,
              color: '#0C3547',
              fontWeight: 500,
              textAlign: 'center',
              maxWidth: 400,
            }}
          >
            {t('productList.noResults')}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: paginated.length < ITEMS_PER_ROW_DESKTOP ? 'center' : 'flex-start',
              rowGap: 5,
              columnGap: { xs: 2, sm: 3, md: 2 },
              direction,
            }}
          >
            {paginated.map(prod => (
              <Box
                key={prod.id}
                sx={{
                  p: 1,
                  boxSizing: 'border-box',
                  flexBasis: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(20% - 16px)' // 5 par ligne
                  },
                  maxWidth: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(20% - 16px)'
                  },
                }}
              >
                <ProductCard product={prod} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, direction }}>
            <Pagination
              count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={(_, v) => setPage(v)}
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
