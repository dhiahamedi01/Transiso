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

const ARTICLES_PAR_PAGE = 6;

export default function Blog() {
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

  // Filtrer les blogs selon la recherche
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer les blogs à afficher selon la page courante
  const indexDepart = (page - 1) * ARTICLES_PAR_PAGE;
  const indexFin = indexDepart + ARTICLES_PAR_PAGE;
  const blogsAffiches = filteredBlogs.slice(indexDepart, indexFin);

  const totalPages = Math.ceil(filteredBlogs.length / ARTICLES_PAR_PAGE);

  const handleVoirPlus = () => {
    router.push('/bloglist'); // redirection vers la page liste des blogs
  };

  return (
    <div className={styles.paper}>
      <div className={styles.titre}>
        <h4 className={styles.section_title2}>المعلومات اللوجستية</h4>
        <span className={styles.sous_titre}>خدمات ومعلومات متعلقة بالشحن من تركيا</span>
      </div>

      <Box sx={{ maxWidth: 400, margin: '20px auto 40px auto' }}>
        <TextField
          fullWidth
          placeholder="بحث في المدونة..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset page à 1 quand on recherche
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { fontFamily: 'Noto Kufi Arabic, Arial, sans-serif' }, // police arabe au champ input
          }}
          sx={{ marginTop: '20px', backgroundColor: '#fff' }}
        />
      </Box>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4rem',
          }}
        >
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
              direction: 'rtl',
              maxWidth: '1300px',
              margin: '0 auto',
            }}
          >
            {blogsAffiches.length === 0 ? (
              <Typography
                sx={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}
              >
                لا توجد مدونات مطابقة للبحث.
              </Typography>
            ) : (
              blogsAffiches.map((post) => {
                const dateObj = new Date(post.date);
                const day = dateObj.getDate().toString().padStart(2, '0');
                const month = dateObj.toLocaleDateString('ar-EG', {
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
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonIcon
                            sx={{ fontSize: '1rem', marginLeft: '0.25rem', color: '#E71E24' }}
                          />
                          <Typography className={styles.arabe} variant="body2">
                            {post.author}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalOfferIcon
                            sx={{ fontSize: '1rem', marginLeft: '0.25rem', color: '#E71E24' }}
                          />
                          <Typography className={styles.arabe} variant="body2">
                            {post.category}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#111827',
                          marginBottom: '0.5rem',
                          lineHeight: 1.5,
                          fontSize: '18px',
                        }}
                        className={styles.arabe}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        className={`${styles.arabe} ${styles.description}`}
                        variant="body2"
                        sx={{
                          color: '#6b7280',
                          marginBottom: '1rem',
                        }}
                      >
                        {post.content}
                      </Typography>

                      <Divider sx={{ borderColor: '#e5e7eb', marginBottom: '1rem' }} />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Link
                        href={`/bloglist/${post.id}`}
                        underline="none"
                        sx={{
                            color: '#ef4444',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                        >
                        اقرأ المزيد ←
                        </Link>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6b7280',
                            fontSize: '0.875rem',
                          }}
                        >
                          <Typography variant="body2" className={styles.arabe}>
                            لا توجد تعليقات
                          </Typography>
                          <ChatBubbleOutlineIcon sx={{ fontSize: '1rem', marginRight: '0.25rem' }} />
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
              direction:'rtl'
            }}
          >
            <Button
              variant="outlined"
              startIcon={<NavigateNextIcon />}
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              sx={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              السابق
            </Button>
            <Typography sx={{ fontFamily: 'Noto Kufi Arabic' }}>
              صفحة {page} من {totalPages}
            </Typography>
            <Button
              variant="outlined"
              endIcon={<NavigateBeforeIcon/>}
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              sx={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              التالي
            </Button>
          </Box>

          <br />
          <br />
        </>
      )}
    </div>
  );
}
