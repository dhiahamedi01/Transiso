'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Pagination,
} from '@mui/material';

const policySections = [
  {
    title: 'من نحن',
    content: `عبر سنوات من العمل في قطاع الخدمات اللوجستية في الدول العربية والعالم، سعت ترانزيسو لتوفير خدمات الشحن الجوي والبحري في تركيا ولأن تكون الداعم اللوجستي الموثوق لعملائها في تركيا. إن موظفينا المدربين وامتداد فروعنا في العالم هم المصدر الرئيسي لخدمة العملاء.`,
  },
  {
    title: 'المعلومات التي نجمعها',
    content:
      'قد نقوم بجمع معلومات شخصية مثل الاسم، البريد الإلكتروني، ورقم الهاتف عند استخدامكم لخدماتنا أو التواصل معنا.',
  },
  {
    title: 'استخدام المعلومات',
    content:
      'نستخدم المعلومات لتقديم وتحسين خدماتنا، وللتواصل مع العملاء، ولضمان تجربة استخدام آمنة وفعالة.',
  },
  {
    title: 'حماية البيانات',
    content:
      'نتخذ إجراءات أمنية تقنية وتنظيمية مناسبة لحماية بياناتكم من الوصول أو الاستخدام غير المصرح به.',
  },
  {
    title: 'التغييرات على سياسة الخصوصية',
    content:
      'نحتفظ بحق تحديث هذه السياسة في أي وقت. سيتم نشر التعديلات على هذه الصفحة مع تاريخ التحديث.',
  },
  {
    title: 'تواصل معنا',
    content:
      'إذا كانت لديكم أي استفسارات بخصوص سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف.',
  },
];

export default function PrivacyPolicy() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Noto Kufi Arabic';
          src: url('/Font/NotoKufiArabic-VariableFont_wght.ttf') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <Box
        sx={{
          px: { xs: 3, sm: 6, md: 10 },
          py: 8,
          minHeight: '100vh',
          direction: 'rtl',
          backgroundColor: '#f4f6f8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Container maxWidth="md">


          <Paper
            elevation={4}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 3,
              backgroundColor: '#fff',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              color: '#2e3a59',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          >
                      <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{
              mb: 5,
              fontWeight: 600,
              fontSize:'25px',
              color: '#0C3547',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              textShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            سياسة الخصوصية
          </Typography>
            {policySections.map((section, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: idx === policySections.length - 1 ? 0 : 6,
                  borderBottom: idx !== policySections.length - 1 ? '1px solid #e1e8f0' : 'none',
                  pb: idx !== policySections.length - 1 ? 4 : 0,
                }}
              >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '18px',
                        color: '#0C3547',
                        letterSpacing: '0.02em',
                        fontFamily: 'Noto Kufi Arabic, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                    <Box component="span" sx={{ ml: 1, color: '#1976d2', fontWeight: 'bold',display: 'flex',
                        alignItems: 'center'}}>
                        <ArrowBackIcon sx={{color:'red'}}/>
                    </Box>
                    {section.title}
                    </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '0.8rem',
                    color: '#4a5578',
                    lineHeight: 1.8,
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                  }}
                >
                  {section.content}
                </Typography>
              </Box>
            ))}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 8,
              }}
            >
              <Pagination count={3} color="primary" shape="rounded" />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
