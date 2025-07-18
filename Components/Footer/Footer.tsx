'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { useSocialLinks } from '@/hooks/useSocialLinks';
import axios from 'axios';

const iconMap: Record<string, React.ReactElement> = {
  facebook: <FacebookIcon fontSize="small" />,
  twitter: <TwitterIcon fontSize="small" />,
  instagram: <InstagramIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
};

const Footer = () => {
  const { socialLinks } = useSocialLinks();
  const [footerDesc, setFooterDesc] = useState(
  );

  useEffect(() => {
    axios.get('/api/footer')
      .then((res) => {
        if (res.data.footer_desc) {
          setFooterDesc(res.data.footer_desc);
        }
      })
      .catch((err) => {
        console.error('Failed to load footer description', err);
      });
  }, []);

  return (
    <>
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
                    <Link href="#" aria-label="Facebook"><FacebookIcon fontSize="small" /></Link>
                    <Link href="#" aria-label="Twitter"><TwitterIcon fontSize="small" /></Link>
                    <Link href="#" aria-label="Instagram"><InstagramIcon fontSize="small" /></Link>
                    <Link href="#" aria-label="LinkedIn"><LinkedInIcon fontSize="small" /></Link>
                  </>
                )}
              </div>
            </div>

            {/* ----- COLUMNS ----- */}
            <div className={styles.col}>
              <h4>الشركة</h4>
              <ul>
                <li><Link href="/About">من نحن</Link></li>
                <li><Link href="/Services">خدماتنا في ترانسيسو</Link></li>
                <li><Link href="/bloglist">بلوجر</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4>المساعدة</h4>
              <ul>
                <li><Link href="/Demande">الاستفسار اون لاين</Link></li>
                <li><Link href="/Inscription">الشحن والإرجاع</Link></li>
                <li><Link href="/Client/TrackingStatus">تتبع الطلب</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4>قائمة منتجاتنا</h4>
              <ul>
                <li><Link href="/Liste_produit">آلات تعبئة وتغليف</Link></li>
                <li><Link href="/Liste_produit">حاويات بلاستيكية</Link></li>
                <li><Link href="/Liste_produit">زيت نباتي خام</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* -------- SUB-FOOTER -------- */}
      <div className={styles.subFooter}>
        © {new Date().getFullYear()} جميع الحقوق محفوظة •
        <Link href="/politique"> Privacy&nbsp;Policy </Link>•
        <Link href="/Terms"> Terms&nbsp;&amp;&nbsp;Conditions </Link>
      </div>
    </>
  );
};

export default Footer;
