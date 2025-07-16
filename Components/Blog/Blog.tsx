'use client';
import React, { useEffect, useState } from 'react';
import { Box, CardContent, Typography, Divider, Link, Button } from '@mui/material';
import {
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon
} from '@mui/icons-material';
import styles from './Blog.module.css';
import { fetchBlogs, BlogArticle } from '@/services/blogService';
import { useRouter } from 'next/navigation';
export default function Blog() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Erreur de chargement des blogs :', err);
      }
    }
    load();
  }, []);

  const router = useRouter();

  const handleVoirPlus = () => {
    router.push('/bloglist'); // redirection vers la page liste des blogs
  };
  return (
    <div className={styles.paper}>
      <div className={styles.titre}>
        <h4 className={styles.section_title2}>المعلومات اللوجستية</h4>
        <span className={styles.sous_titre}>خدمات ومعلومات متعلقة بالشحن من تركيا</span>
      </div>

      <br /><br />

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
        {blogs.slice(0, visibleCount).map((post) => {
          const dateObj = new Date(post.date);
          const day = dateObj.getDate().toString().padStart(2, '0');
          const month = dateObj.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });

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
                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ fontSize: '1rem', marginLeft: '0.25rem', color: '#E71E24' }} />
                    <Typography className={styles.arabe} variant="body2">{post.author}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalOfferIcon sx={{ fontSize: '1rem', marginLeft: '0.25rem', color: '#E71E24' }} />
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
                    fontSize: '18px'
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
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                    <Typography variant="body2" className={styles.arabe}>لا توجد تعليقات</Typography>
                    <ChatBubbleOutlineIcon sx={{ fontSize: '1rem', marginRight: '0.25rem' }} />
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
            fontFamily: 'Noto Kufi Arabic',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
          onClick={handleVoirPlus}
        >
          عرض المزيد
        </Button>
      </Box>

      <br /><br />
    </div>
  );
}
