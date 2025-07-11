'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  GroupOutlined,
  WorkOutlineOutlined,
  TrackChangesOutlined,
  StorefrontOutlined,
  ReceiptLongOutlined,
  EmailOutlined,
  GTranslate,
} from "@mui/icons-material";

import styles from "./Sidebar.module.css";

interface MenuItem {
  title: string;
  href: string;
  Icon: any;
  isProfile?: boolean; // Marquer l’élément à modifier dynamiquement
}

const ACCOUNT_ITEMS: MenuItem[] = [
  { title: "Profile Information", href: "/Client/Profile", Icon: GroupOutlined, isProfile: true },
  { title: "Previous Orders", href: "/Client/OrdersHistory", Icon: WorkOutlineOutlined },
  { title: "Shipment Tracking", href: "/Client/TrackingStatus", Icon: TrackChangesOutlined },
  { title: "Current Orders", href: "/Client/Cart", Icon: StorefrontOutlined },
  { title: "Invoices", href: "/Client/Invoices", Icon: ReceiptLongOutlined },
  { title: "Support Contact", href: "/Client/Support", Icon: EmailOutlined },
  { title: "Change Language", href: "/Client/Language", Icon: GTranslate },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <aside className={styles.sidebar}>
      <header className={styles.logo}>
        <Image
          src="/img/LOGO_light.png"
          alt="Logo"
          width={155}
          height={50}
          priority
        />
      </header>

      <nav className={styles.section}>
        <span className={styles.sectionLabel}>ACCOUNT</span>

        <ul className={styles.menuList}>
          {ACCOUNT_ITEMS.map(item => {
            // Pour l'item Profile uniquement, on ajoute /userId à la fin du lien
            const finalHref = item.isProfile && userId
              ? `${item.href}/${userId}`
              : item.href;

            return (
              <li key={item.title}>
                <Link
                  href={finalHref}
                  className={`${styles.menuItem} ${isActive(finalHref) ? styles.active : ""}`}
                >
                  <item.Icon className={styles.icon} fontSize="small" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
