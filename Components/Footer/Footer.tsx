import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon  from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => (
  <>
    {/* -------- FOOTER PRINCIPAL -------- */}
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ----- BRANDING ----- */}
          <div className={styles.brand}>
            <Image
              src="/img/LOGO_light.png"     /* placer votre logo ici */
              alt="Logo"
              width={120}
              height={40}
              className={styles.logo}
              priority
            />
            <p className={styles.description}>
            نقدم خدمات الشحن من اسطنبول وتركيا توفر ترانسيسو لوجستيك عبر الموانئ التركية خدمة شحن الحاويات البحرية إلى معظم دول العالم
            </p>
            <div className={styles.socialLinks}>
              <Link href="#" aria-label="Facebook"><FacebookIcon fontSize="small" /></Link>
              <Link href="#" aria-label="Twitter"><TwitterIcon  fontSize="small" /></Link>
              <Link href="#" aria-label="Instagram"><InstagramIcon fontSize="small" /></Link>
              <Link href="#" aria-label="LinkedIn"><LinkedInIcon fontSize="small" /></Link>
            </div>
          </div>

          {/* ----- COLONNES LIENS ----- */}
          <div className={styles.col}>
            <h4>الشركة</h4>
            <ul>
              <li><Link href="#">من نحن</Link></li>
              <li><Link href="#">خدماتنا في ترانسيسو</Link></li>
              <li><Link href="#">لوجيستيات</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>المساعدة</h4>
            <ul>
              <li><Link href="#">الاستفسار اون لاين</Link></li>
              <li><Link href="#">الشحن والإرجاع</Link></li>
              <li><Link href="#">تتبع الطلب</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>قائمة منتجاتنا</h4>
            <ul>
              <li><Link href="#">آلات تعبئة وتغليف</Link></li>
              <li><Link href="#">حاويات بلاستيكية</Link></li>
              <li><Link href="#">زيت نباتي خام</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    {/* -------- SUB-FOOTER LÉGAL -------- */}
    <div className={styles.subFooter}>
      © {new Date().getFullYear()} جميع الحقوق محفوظة •
      <Link href="#"> Privacy&nbsp;Policy </Link>•
      <Link href="#"> Terms&nbsp;&amp;&nbsp;Conditions </Link>
    </div>
  </>
);

export default Footer;
