'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Service.module.css'; // crée ce fichier ou adapte
import { Typography, CircularProgress, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FAQ from '@/Components/FAQ/FAQ';
import OtherServices from '@/Components/Service/Side_card/OtherServices';

interface Service {
  id: number;
  title: string;
  description: string;
  content: string;
  icon_path: string;
}

export default function ServiceDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error('Service introuvable');
        const data = await res.json();
        setService(data);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.center}>
      <CircularProgress color="error" />
    </div>
    );
  }

  if (error || !service) {
    return (
      <div className={styles.center}>
        <Typography variant="h6" color="error">{error || 'Service non trouvé'}</Typography>
        <Button variant="contained" color="error" onClick={() => router.push('/Services')}>
          Retour aux services
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.Paper}>
      <div className={styles.Paper_g}>
        <div className={styles.partie3}>
          <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
            الخدمات الرئيسية
            <div className={styles.titleUnderline} />
          </Typography>
          <OtherServices />
        </div>

        <div className={styles.partie1}>
          <div className={styles.contenue}>
            <div className={styles.image_demande}>
              <Image src="/img/Background/quote.svg" alt="msg" width={50} height={50} className={styles.imagec} />
            </div>
            <h2 className={styles.titre_demande}>طلب المساعدة</h2>
            <div className={styles.Description_demande}>
              لطلب المساعدة يرجى النقر على استفسر الآن وملء المعلومات المطلوبة
            </div>
            <div className={styles.button_demande}>
              <Link href="/Demande">
                <button className={styles.btn_arabic}>
                  <Image src="/img/Background/email.svg" alt="icon" width={20} height={20} className={styles.btn_icon} />
                  استفسر الآن
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.bottom_image_container}>
            <Image src="/img/service-details-sidebar-img.png" alt="footer decoration" width={260} height={260} className={styles.bottom_image} />
          </div>
        </div>
      </div>

      <div className={styles.Paper_d}>
        <div className={styles.Image}>
          <Image
            src={service.icon_path}
            alt={service.title}
            width={900}
            height={530}
            priority
            style={{ objectFit: "cover" }}
            className={styles.imagec}
          />
        </div>

        <h1 className={styles.sectionHeading}>{service.title}</h1>
        <div className={styles.description}>{service.description}</div>
        <div className={styles.description} style={{ whiteSpace: "pre-line" }}>{service.content}</div>

        <div className={styles.Card}>
          <div className={styles.sous_Card1}>
            <div className={styles.texts_card}>
              <div className={styles.titre_card}>
                <LocationOnIcon className={styles.icon_card} />
                تتبع بسيط وفعال
              </div>
              <div className={styles.desc_card}>
                أنظمة تتبع متقدمة، تحليلات لحظية، وخبراء لوجستيين متخصصين لضمان سهولة إدارة الشحنات.
              </div>
            </div>
          </div>

          <div className={styles.sous_Card1}>
            <div className={styles.texts_card}>
              <div className={styles.titre_card}>
                <SupportAgentIcon className={styles.icon_card} />
                دعم سريع
              </div>
              <div className={styles.desc_card}>
                نحن متخصصون في تنسيق المستودعات، التوصيل النهائي، والتحكم في المخزون بكفاءة عالية.
              </div>
            </div>
          </div>
        </div>

        <FAQ />
      </div>
    </div>
  );
}
