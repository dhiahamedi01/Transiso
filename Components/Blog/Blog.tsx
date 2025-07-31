'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  Divider,
  Link,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
} from '@mui/icons-material';
import styles from './Blog.module.css';
import { fetchBlogs, BlogArticle } from '@/services/blogService';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [visibleCount] = useState(6);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBlogs();
        const filtered = data.filter((blog: BlogArticle) => blog.lang === currentLang);
        setBlogs(filtered);
      } catch (err) {
        console.error('Erreur de chargement des blogs :', err);
      }
    }
    load();
  }, [currentLang]);

  const handleVoirPlus = () => {
    router.push('/bloglist');
  };

  return (
    <div
      className={styles.paper}
      style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={styles.titre}>
        <h4 className={styles.section_title2}>{t('blog.title')}</h4>
        <span className={styles.sous_titre}>{t('blog.sous_titre')}</span>
      </div>

      <br /><br />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          backgroundColor: '#f0f2f5',
          padding: '40px',
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        {blogs.slice(0, visibleCount).map((post) => {
          const dateObj = new Date(post.date);
          const day = dateObj.getDate().toString().padStart(2, '0');
          const month = dateObj.toLocaleDateString(
            currentLang === 'ar' ? 'ar-EG' : currentLang === 'tr' ? 'tr-TR' : 'en-US',
            { month: 'long', year: 'numeric' }
          );

          return (
            <div key={post.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={post.image_path}
                  alt={post.title}
                  className={styles.imageMedia}
                />
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    href={`/bloglist/${post.post_id}`}
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
                    {t('blog.readMore')} →
                  </Link>

                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                    <Typography variant="body2" className={styles.arabe}>
                      {t('blog.noComments')}
                    </Typography>
                    <ChatBubbleOutlineIcon sx={{ fontSize: '1rem', marginInlineStart: '0.25rem' }} />
                  </Box>
                </Box>
              </CardContent>
            </div>
          );
        })}
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#E71E24',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 30px',
            borderRadius: '5px',
            fontFamily: currentLang === 'ar' ? 'Noto Kufi Arabic' : 'inherit',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
          onClick={handleVoirPlus}
        >
          {t('blog.readMore')}
        </Button>
      </Box>

      <br /><br />
    </div>
  );
}
