// -------------- SERVER COMPONENT --------------
import styles from './TopBar.module.css';
import Link from 'next/link';

// ces icônes SVG ne chargent pas de JS côté client
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon      from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon   from '@mui/icons-material/Facebook';
import TwitterIcon    from '@mui/icons-material/Twitter';
import WhatsAppIcon   from '@mui/icons-material/WhatsApp';
import InstagramIcon  from '@mui/icons-material/Instagram';
import LanguageSelector from '@/Components/LanguageSelector/LanguageSelector';



export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <span className={styles.infoItem}>
          <LocationOnIcon fontSize="small" className={styles.loc} />
          Istanbul, Turkey
        </span>
        <span className={styles.separator}>|</span>
        <span className={styles.infoItem}>
          <EmailIcon fontSize="small" className={styles.loc} />
          info@transisologistic.com
        </span>
        <span className={styles.separatorDesk}>|</span>
        <span className={styles.time}>
          <AccessTimeIcon fontSize="small" className={styles.loc} />
          الإثنين – الأحد : 9:00 – 20:00
        </span>
      </div>

      <div className={styles.right}>
        <LanguageSelector/>
        <Link href="#" className={styles.inquiry}>الاستفسار اون لاين</Link>
        <span className={styles.follow}>تابعنا على :</span>
        <span className={styles.socials}>
          <FacebookIcon fontSize="small" />
          <TwitterIcon  fontSize="small" />
          <WhatsAppIcon fontSize="small" />
          <InstagramIcon fontSize="small" />
        </span>
      </div>
    </div>
  );
}
