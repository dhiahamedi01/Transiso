import React from 'react';
import { Box, CardContent, Typography, Divider, Link } from '@mui/material';
import {
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon
} from '@mui/icons-material';
import styles from './Blog.module.css';

const posts = [
  {
    id: 1,
    image: '/img/post/post-3.jpg',
    date: '15',
    month: 'أبريل، 2025',
    author: 'أحمد',
    category: 'لوجستيك',
    title: 'تطور النقل اللوجستي في تركيا',
    description: 'شهدت تركيا تحولاً كبيراً في مجال النقل واللوجستيات خلال السنوات الأخيرة...',
  },
  {
    id: 2,
    image: '/img/post/post-1.jpg',
    date: '09',
    month: 'مايو، 2025',
    author: 'ليلى',
    category: 'موانئ',
    title: 'دور الموانئ التركية في التجارة العالمية',
    description: 'تعتبر الموانئ التركية من المراكز الحيوية لنقل البضائع عبر أوروبا وآسيا...',
  },
  {
    id: 3,
    image: '/img/post/post-2.jpg',
    date: '01',
    month: 'أبريل، 2025',
    author: 'كريم',
    category: 'سلاسل التوريد',
    title: 'تحسين سلاسل الإمداد داخل تركيا',
    description: 'تركيا تعمل على تطوير بنيتها التحتية لدعم كفاءة سلاسل الإمداد والنقل...',
  },
  {
    id: 4,
    image: '/img/post/post6.jpg',
    date: '12',
    month: 'أبريل، 2025',
    author: 'سارة',
    category: 'تجارة',
    title: 'نمو التجارة الإلكترونية في تركيا',
    description: 'تشهد التجارة الإلكترونية نمواً سريعاً في تركيا بدعم من البنية التحتية الرقمية...',
  },
  {
    id: 5,
    image: '/img/post/post5.jpg',
    date: '28',
    month: 'أبريل، 2025',
    author: 'محمد',
    category: 'نقل جوي',
    title: 'تطور النقل الجوي في تركيا',
    description: 'المطارات التركية تشهد تطوراً ملحوظاً في مجال الشحن والخدمات اللوجستية...',
  },
  {
    id: 6,
    image: '/img/post/post-4.jpg',
    date: '07',
    month: 'أبريل، 2025',
    author: 'نور',
    category: 'تخزين',
    title: 'تحسين مرافق التخزين في الموانئ',
    description: 'تركيا تستثمر في تحديث مرافق التخزين لتعزيز كفاءة سلاسل الإمداد...',
  }
  
];

export default function Blog() {
  return (
    <div className={styles.paper}>
    <div className={styles.titre}>
    <h4 className={styles.section_title2}>المعلومات اللوجستية</h4>
    <span className={styles.sous_titre}>
    خدمات ومعلومات متعلقة بالشحن من تركيا
    </span>
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

      {posts.map((post) => (
        <div key={post.id} className={styles.card}>
          {/* Image */}
          <div className={styles.imageContainer}>
            <img
              src={post.image}
              alt={post.title}
              className={styles.imageMedia}
            />
          </div>

          {/* Date Overlay */}
          <div className={styles.dateOverlay}>
            <div className={styles.dateNumber}>{post.date}</div>
            <div className={styles.dateMonth}>{post.month}</div>
          </div>

          {/* Card Content */}
          <CardContent sx={{ paddingTop: '2.5rem' }}>
            {/* Author + Category */}
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ fontSize: '1rem', marginLeft: '0.25rem', color: '#E71E24' }} />
                <Typography className={styles.arabe} variant="body2">{post.author}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalOfferIcon sx={{ fontSize: '1rem', marginLeft: '0.25rem', color: '#E71E24' }} />
                <Typography className={styles.arabe}  variant="body2">{post.category}</Typography>
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#111827',
                marginBottom: '0.5rem',
                lineHeight: 1.5,
                fontSize:'18px'
              }}
              className={styles.arabe} 
            >
              {post.title}
            </Typography>

            {/* Description */}
            <Typography className={styles.arabe}  variant="body2"   sx={{ color: '#6b7280', marginBottom: '1rem', lineHeight: 1.7 }}>
              {post.description}
            </Typography>

            <Divider sx={{ borderColor: '#e5e7eb', marginBottom: '1rem' }} />

            {/* Read More + Comments */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#ef4444',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                اقرأ المزيد ←
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                
                <Typography variant="body2" className={styles.arabe} >لا توجد تعليقات</Typography>
                <ChatBubbleOutlineIcon sx={{ fontSize: '1rem', marginRight: '0.25rem' }} />
              </Box>
            </Box>
          </CardContent>
        </div>
      ))}
    </Box>
    <br /><br />
    </div>
  );
}
