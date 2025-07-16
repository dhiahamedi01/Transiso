import Image from "next/image";
import Link from "next/link";
import styles from "./Service.module.css";
import FAQ from "@/Components/FAQ/FAQ";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import OtherServices from "@/Components/Service/Side_card/OtherServices";
import { Typography } from "@mui/material";

interface Service {
  id: number;
  title: string;
  description: string;
  content: string;
  icon_path: string;
}

interface ServicePageProps {
  params: {
    id: string;
  };
}

async function getService(id: string): Promise<Service> {
  // استعمل رابط كامل أو النسبية حسب بيئة التشغيل
  const res = await fetch(`http://localhost:3000/api/services/${id}`, {
    cache: "no-store", // باش كل مرة يجيب البيانات حديثة
  });

  if (!res.ok) {
    throw new Error("Service introuvable");
  }
  return res.json();
}

export default async function ServicePage({ params }: ServicePageProps) {
  let service: Service;

  try {
    service = await getService(params.id);
  } catch (error) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Erreur lors de la récupération du service</h2>
        <p>{(error as Error).message}</p>
        <Link href="/Services">Retour aux services</Link>
      </div>
    );
  }

  return (
    <div className={styles.Paper}>
      <div className={styles.Paper_g}>
        {/* Partie latérale gauche */}
        <div className={styles.partie3}>
          <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
            الخدمات الرئيسية
            <div className={styles.titleUnderline} />
          </Typography>
          <OtherServices />
        </div>

        {/* Partie centrale droite */}
        <div className={styles.partie1}>
          <div className={styles.contenue}>
            <div className={styles.image_demande}>
              <Image
                className={styles.imagec}
                src="/img/Background/quote.svg"
                alt="msg"
                width={50}
                height={50}
              />
            </div>
            <h2 className={styles.titre_demande}>طلب المساعدة</h2>
            <div className={styles.Description_demande}>
              لطلب المساعدة يرجى النقر على استفسر الآن وملء المعلومات المطلوبة
            </div>
            <div className={styles.button_demande}>
              <Link href="/Demande" passHref>
                <button className={styles.btn_arabic} type="button">
                  <Image
                    src="/img/Background/email.svg"
                    alt="icon"
                    className={styles.btn_icon}
                    width={20}
                    height={20}
                  />
                  استفسر الآن
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.bottom_image_container}>
            <Image
              src="/img/Background/user.png"
              alt="footer decoration"
              width={220}
              height={250}
              className={styles.bottom_image}
            />
          </div>
        </div>
      </div>

      {/* Partie droite / Détails Service */}
      <div className={styles.Paper_d}>
        {/* Image dynamique */}
        <div className={styles.Image}>
          <Image
            className={styles.imagec}
            src={service.icon_path.startsWith("http") ? service.icon_path : service.icon_path}
            alt={service.title}
            width={900}
            height={530}
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Titre dynamique */}
        <h1 className={styles.sectionHeading}>{service.title}</h1>

        {/* Description dynamique */}
        <div className={styles.description}>{service.description}</div>

        {/* Content dynamique, gestion retour à la ligne */}
        <div className={styles.description} style={{ whiteSpace: "pre-line" }}>
          {service.content}
        </div>

        {/* Tes cards fixes */}
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

        {/* FAQ */}
        <FAQ />
      </div>
    </div>
  );
}
