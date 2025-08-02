'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  Divider,
  Link,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import {
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Search as SearchIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import styles from './Blog.module.css';
import { fetchBlogs, BlogArticle } from '@/services/blogService';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ARTICLES_PAR_PAGE = 6;

export default function Blog() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // 'ar', 'en', 'tr'
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Erreur de chargement des blogs :', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtrer selon la langue active
  const blogsLangue = blogs.filter((blog) => blog.lang === currentLang);

  // Rechercher dans les blogs filtrés
  const blogsFiltres = blogsLangue.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexDepart = (page - 1) * ARTICLES_PAR_PAGE;
  const blogsAffiches = blogsFiltres.slice(indexDepart, indexDepart + ARTICLES_PAR_PAGE);
  const totalPages = Math.ceil(blogsFiltres.length / ARTICLES_PAR_PAGE);

  return (
    <div className={styles.paper}>
      <div className={styles.titre}>
        <h4 className={styles.section_title2}>{t('blog.title')}</h4>
        <span className={styles.sous_titre}>{t('blog.sous_titre')}</span>
      </div>

      <Box sx={{ maxWidth: 400, margin: '20px auto 40px auto' }}>
        <TextField
          fullWidth
          placeholder={t('blog.search')}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { fontFamily: 'Noto Kufi Arabic, Arial, sans-serif' },
          }}
          sx={{ marginTop: '20px', backgroundColor: '#fff' }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <CircularProgress color="error" />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              backgroundColor: '#f0f2f5',
              padding: '40px',
              direction: currentLang === 'ar' ? 'rtl' : 'ltr',
              maxWidth: '1300px',
              margin: '0 auto',
            }}
          >
            {blogsAffiches.length === 0 ? (
              <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>
                {t('blog.noBlogs')}
              </Typography>
            ) : (
              blogsAffiches.map((post) => {
                const dateObj = new Date(post.date);
                const day = dateObj.getDate().toString().padStart(2, '0');
                const month = dateObj.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
                  month: 'long',
                  year: 'numeric',
                });

                return (
                  <div key={post.id} className={styles.card}>
                    <div className={styles.imageContainer}>
                      <img src={post.image_path} alt={post.title} className={styles.imageMedia} />
                    </div>

                    <div className={styles.dateOverlay}>
                      <div className={styles.dateNumber}>{day}</div>
                      <div className={styles.dateMonth}>{month}</div>
                    </div>

                    <CardContent sx={{ paddingTop: '2.5rem' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          marginBottom: '0.75rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonIcon sx={{ fontSize: '1rem', marginInlineEnd: '0.25rem', color: '#E71E24' }} />
                          <Typography className={styles.arabe} variant="body2">{post.author}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalOfferIcon sx={{ fontSize: '1rem', marginInlineEnd: '0.25rem', color: '#E71E24' }} />
                          <Typography className={styles.arabe} variant="body2">{post.category}</Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="h6"
                        className={styles.arabe}
                        sx={{
                          fontWeight: 700,
                          color: '#111827',
                          marginBottom: '0.5rem',
                          lineHeight: 1.5,
                          fontSize: '18px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {post.title}
                      </Typography>


                      <Typography className={`${styles.arabe} ${styles.description}`} variant="body2" sx={{ color: '#6b7280', marginBottom: '1rem' }}>
                        {post.content}
                      </Typography>

                      <Divider sx={{ borderColor: '#e5e7eb', marginBottom: '1rem' }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <NextLink
                          href={`/bloglist/${post.post_id}`}>
                          <Box
                          sx={{
                            color: '#ef4444',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            '&:hover': { textDecoration: 'underline' },
                          }}

                        >
                          {t('blog.readMore')}
                          </Box>
                        </NextLink>

                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                          <Typography variant="body2" className={styles.arabe}>{t('blog.noComments')}</Typography>
                          <ChatBubbleOutlineIcon sx={{ fontSize: '1rem', marginInlineStart: '0.25rem' }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </div>
                );
              })
            )}
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              marginTop: '2rem',
              direction: currentLang === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<NavigateNextIcon />}
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              sx={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              {t('blog.prev')}
            </Button>
            <Typography sx={{ fontFamily: 'Noto Kufi Arabic' }}>
              {t('blog.page')} {page} {t('of')} {totalPages}
            </Typography>
            <Button
              variant="outlined"
              endIcon={<NavigateBeforeIcon />}
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              sx={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              {t('blog.next')}
            </Button>
          </Box>

          <br />
          <br />
        </>
      )}
    </div>
  );
}
