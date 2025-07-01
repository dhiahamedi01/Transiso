import React, { useState, useRef } from 'react';
import ImageGallery from "../Image_produit/ImageGallery";
import Style from "./Product.module.css"
import Rating from '@mui/material/Rating';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import GradeIcon from '@mui/icons-material/Grade';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Commander from './Commander';
import { useTranslation } from 'react-i18next';

export default function Product() {
  const { t, i18n } = useTranslation('common'); 
  const currentLang = i18n.language;


  const isRTL = currentLang === 'ar';

  const colors = [
    { name: t('colors.red') || 'Rouge', value: '#f44336' },
    { name: t('colors.green') || 'Vert', value: '#4caf50' },
    { name: t('colors.blue') || 'Bleu', value: '#2196f3' },
    { name: t('colors.yellow') || 'Jaune', value: '#ffeb3b' },
    { name: t('colors.orange') || 'Orange', value: '#ff9800' },
    { name: t('colors.purple') || 'Violet', value: '#9c27b0' },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const descriptionRef = useRef(null);

  const breadcrumbs = [
    <Link className={Style.arabica} underline="hover" key="1" color="inherit" href="/">
      {t('breadcrumbs.home')}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/product-list"
      className={Style.arabica}
    >
      {t('breadcrumbs.productList')}
    </Link>,
    <Typography className={Style.arabica} key="3" sx={{ color: 'text.primary' }}>
      {t('breadcrumbs.category')}
    </Typography>,
  ];

  return (
    <>
      <div className={ currentLang === 'ar'
          ? `${Style.Top_page} ${Style.rtl}`
          : `${Style.Top_page2} ${Style.ltr}`}>
      <Stack spacing={2} className={Style.Breadcrumbs}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      </div>

      <div className={ currentLang === 'ar'
          ? `${Style.globale} ${Style.rtl}`
          : `${Style.globale} ${Style.ltr}`}>
      <div className={ currentLang === 'ar'
          ? `${Style.partie} ${Style.rtl}`
          : `${Style.partie3} ${Style.ltr}`}>
          <ImageGallery />
        </div>

        <div className={ currentLang === 'ar'
          ? `${Style.partie1} ${Style.rtl}`
          : `${Style.partie2} ${Style.ltr}`}>
          <span className={Style.text_head}>
            <div className={Style.solde}>
              <AutoFixHighIcon sx={{ fontSize: '16px' }} />
              &ensp;{t('discount')}
            </div>
            <span className={Style.price_avant}>{t('oldPrice')}</span>
          </span>

          <span className={Style.text_head}>
            <span className={Style.titre}>{t('productTitle')}</span>
            <span className={Style.price}>{t('price')}</span>
          </span>

          <br />

          <div className={Style.text2}>
            <div className={Style.Title_description}>
              {t('shortDescriptionTitle')}
            </div>
            <div className={Style.description}>
              {t('shortDescriptionText')}
            </div>
          </div>

          <div className={Style.text3}>
            <p className={Style.stock}>
              <CheckCircleIcon sx={{ fontSize: '16px', color: '#47cf67' }} />
              &ensp;{t('stockAvailable')}
            </p>
            <div className={Style.Round2}>
              <div className={Style.Round}></div>
            </div>

            <div className={Style.Rating}>
              <Rating
                name="product-rating"
                value={5}
                readOnly
                icon={<GradeIcon fontSize="inherit" sx={{ color: '#FAAF00' }} />}
                emptyIcon={<GradeIcon fontSize="inherit" sx={{ opacity: 0.3 }} />}
                sx={{ fontSize: 18 }}
              />
              <p className={Style.p}>{t('ratingCount')}</p>
            </div>
          </div>

          <div className={Style.text4}>
            <div className={Style.bigou}>
              <p className={Style.p1}>{t('freshness')}</p>
            </div>

            <div className={Style.Round2}>
              <div className={Style.Round}></div>
            </div>

            <div className={Style.partage}>
              <div className={Style.social}>
                <FacebookIcon sx={{ color: '#1877F2' }} />
                <InstagramIcon sx={{ color: '#E1306C' }} />
                <XIcon sx={{ color: '#000000' }} />
                <YouTubeIcon sx={{ color: '#FF0000' }} />
              </div>
            </div>
          </div>

          <div className={Style.text}>
            <Commander />
          </div>
        </div>
      </div>
    </>
  );
}
