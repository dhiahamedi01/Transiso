'use client';

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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const termsSections = [
  {
    title: 'الشروط العامة',
    content: `باستخدامك لموقعنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع.`,
  },
  {
    title: 'الملكية الفكرية',
    content:
      'جميع المحتويات المنشورة على الموقع محمية بحقوق الملكية الفكرية ولا يجوز نسخها أو إعادة نشرها بدون إذن كتابي منا.',
  },
  {
    title: 'الاستخدام المسموح به',
    content:
      'يُسمح لك باستخدام الموقع للأغراض الشخصية وغير التجارية فقط. يحظر استخدام الموقع بأي طريقة تخالف القانون أو تسبب ضررًا للموقع أو مستخدميه.',
  },
  {
    title: 'المسؤولية',
    content:
      'نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام الموقع أو الاعتماد على المعلومات الواردة فيه.',
  },
  {
    title: 'تعديلات الشروط',
    content:
      'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر النسخة المعدلة على الموقع مع تاريخ التحديث.',
  },
  {
    title: 'الاتصال بنا',
    content:
      'لأي استفسارات بخصوص الشروط والأحكام، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف الموجود في صفحة الاتصال.',
  },
];

export default function TermsConditions() {
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
                fontSize: '25px',
                color: '#0C3547',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                textShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                direction: 'rtl',
              }}
            >
              <Box component="span" sx={{ mr: 1, color: '#1976d2', fontWeight: 'bold' }}>
              </Box>
              الشروط والأحكام
            </Typography>

            {termsSections.map((section, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: idx === termsSections.length - 1 ? 0 : 6,
                  borderBottom: idx !== termsSections.length - 1 ? '1px solid #e1e8f0' : 'none',
                  pb: idx !== termsSections.length - 1 ? 4 : 0,
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
                    direction: 'rtl',
                  }}
                >
                  <Box component="span" sx={{ mr: 1, color: '#1976d2', fontWeight: 'bold' ,display: 'flex',
                    alignItems: 'center',}}>
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
