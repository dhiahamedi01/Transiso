'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import { Person, Event, Category, ArrowBack } from '@mui/icons-material';
import styles from '@/Components/Blog/BlogDetail.module.css';

type BlogArticle = {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  image_path: string;
};

const categories = [
  'شحن',
  'تخزين',
  'نقل بري',
  'استيراد',
  'تصدير',
  'لوجستيات عامة',
];

export default function BlogDetail() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [blog, setBlog] = useState<BlogArticle | null>(null);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Article courant
  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error('Article non trouvé');
        const data = await res.json();
        setBlog(data);
      } catch (err: any) {
        setError(err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  // Tous les blogs
  useEffect(() => {
    async function fetchAllBlogs() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Erreur chargement blogs:', err);
      }
    }

    fetchAllBlogs();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10, height: '80vh' }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 5 }}>
        {error}
      </Typography>
    );
  }

  if (!blog) return null;

  const formattedDate = new Date(blog.date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.globale}>
      <Box className={styles.blogContainer}>
        <Box className={styles.mainContent}>
          {/* Bouton retour */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.back()}
            startIcon={<ArrowBack />}
            sx={{ mb: 3,gap:2 }}
            className={styles.aroubica}
          >
            العودة إلى القائمة
          </Button>

          <Typography className={styles.blogTitle}>{blog.title}</Typography>
          <img src={blog.image_path} alt={blog.title} className={styles.blogImage} />

          <Box className={styles.blogMeta}>
            <Person sx={{ fontSize: '1rem', color: '#ef4444' }} />
            <span>{blog.author}</span>
            <Event sx={{ fontSize: '1rem', color: '#ef4444' }} />
            <span>{formattedDate}</span>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Typography className={styles.blogContent}>{blog.content}</Typography>
        </Box>

        {/* Sidebar */}
        <Box className={styles.sidebar}>
          
          <Typography className={styles.sidebarTitle}>مقالات أخرى</Typography>
          <Divider sx={{ mb: 2 }} />

          {blogs
            .filter((b) => b.id !== blog.id)
            .slice(0, 4)
            .map((item) => {
              const date = new Date(item.date).toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 2,
                    p: 2,
                    border: '1px solid #eee',
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#fef2f2',
                    },
                  }}
                  onClick={() => router.push(`/blogdetail/${item.id}`)}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', color: '#111827', mb: 1, fontSize: '1rem' }}
                    className={styles.aroubica}
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6b7280', fontSize: 13 }}>
                    <Person sx={{ fontSize: 16, color: '#ef4444' }} />
                    <span>{item.author}</span>
                    <Event sx={{ fontSize: 16, color: '#ef4444' }} />
                    <span>{date}</span>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </div>
  );
}
