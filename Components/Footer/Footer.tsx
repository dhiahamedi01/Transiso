'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; 

import { useSocialLinks } from '@/hooks/useSocialLinks';
import axios from 'axios';

const iconMap: Record<string, React.ReactElement> = {
  facebook: <FacebookIcon fontSize="small" />,
  twitter: <TwitterIcon fontSize="small" />,
  instagram: <InstagramIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
  tiktok: <MusicNoteIcon fontSize="small" />,
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const { socialLinks } = useSocialLinks();
  const [footerDesc, setFooterDesc] = useState('');

  useEffect(() => {
    axios.get(`/api/footer?lang=${lang}`)
      .then((res) => {
        if (res.data.footer_desc) {
          setFooterDesc(res.data.footer_desc);
        }
      })
      .catch((err) => {
        console.error('Failed to load footer description', err);
      });
  }, [lang]);

  return (
    <div dir={dir}>
      {/* -------- FOOTER PRINCIPAL -------- */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* ----- BRANDING ----- */}
            <div className={styles.brand}>
              <Image
                src="/img/LOGO_light.png"
                alt="Logo"
                width={120}
                height={40}
                className={styles.logo}
                priority
              />
              <p className={styles.description}>{footerDesc}</p>

              <div className={styles.socialLinks}>
                {socialLinks.length > 0 ? (
                  socialLinks.map(({ id, platform, url }) => {
                    const icon = iconMap[platform.toLowerCase()];
                    if (!icon || !url) return null;
                    return (
                      <Link key={id} href={url} aria-label={platform} target="_blank" rel="noopener noreferrer">
                        {icon}
                      </Link>
                    );
                  })
                ) : (
                  <>
                    <Link href="#"><FacebookIcon fontSize="small" /></Link>
                    <Link href="#"><TwitterIcon fontSize="small" /></Link>
                    <Link href="#"><InstagramIcon fontSize="small" /></Link>
                    <Link href="#"><LinkedInIcon fontSize="small" /></Link>
                    <Link href="#"><MusicNoteIcon fontSize="small" /></Link>
                  </>
                )}
              </div>
            </div>

            {/* ----- COLUMNS ----- */}
            <div className={styles.col}>
              <h4>{t('footer.company')}</h4>
              <ul>
                <li><Link href="/About">{t('footer.about')}</Link></li>
                <li><Link href="/Services">{t('footer.services')}</Link></li>
                <li><Link href="/bloglist">{t('footer.blog')}</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4>{t('footer.help')}</h4>
              <ul>
                <li><Link href="/Demande">{t('footer.inquiry')}</Link></li>
                <li><Link href="/Inscription">{t('footer.shipping')}</Link></li>
                <li><Link href="/Client/TrackingStatus">{t('footer.tracking')}</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4>{t('footer.products')}</h4>
              <ul>
              <li><Link href="/Liste_produit">{t('footer.cosmetics')}</Link></li>
              <li><Link href="/Liste_produit">{t('footer.kitchenware')}</Link></li>
              <li><Link href="/Liste_produit">{t('footer.raw_materials')}</Link></li>
              <li><Link href="/Liste_produit">{t('footer.building_materials')}</Link></li>
              <li><Link href="/Liste_produit">{t('footer.furniture')}</Link></li>

              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* -------- SUB-FOOTER -------- */}
      <div className={styles.subFooter}>
        © {new Date().getFullYear()} {t('footer.rights')} •
        <Link href="/politique"> {t('footer.privacy')} </Link> •
        <Link href="/Terms"> {t('footer.terms')} </Link>
      </div>
    </div>
  );
};

export default Footer;
