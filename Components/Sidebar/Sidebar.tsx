'use client';

import { useState } from "react";
import { usePathname } from "next/navigation"; // pour récupérer la route actuelle
import type { ElementType } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import Image from 'next/image';
import {
  HomeRounded,
  CalendarMonthOutlined,
  ArticleOutlined,
  CurrencyBitcoinOutlined,
  EmailOutlined,
  ReceiptLongOutlined,
  WorkOutlineOutlined,
  CheckBoxOutlined,
  GroupOutlined,
  InsertDriveFileOutlined,
  StorefrontOutlined,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { TrackChangesOutlined } from "@mui/icons-material";

interface SubItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  Icon?: ElementType;
  children?: SubItem[];
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    label: "MENU",
    items: [
      {
        title: "Dashboards",
        href: "/Dashboard",
        Icon: HomeRounded,
      },
    ],
  },
  {
    label: "APPS",
    items: [
      { title: "Gestion employe", href: "/Dashboard/Employe", Icon: GroupOutlined },
      { title: "Calendar", href: "/calendar", Icon: CalendarMonthOutlined },
      { title: "Tracking", href: "", Icon: TrackChangesOutlined ,
        children: [
          { title: "ARAMEX ", href: "/Dashboard/Tracking" },
          { title: "DHL Group", href: "/Analytics" },
          { title: "CMA CGM", href: "/Sales" },
        ]
      },
      { title: "Translate", href: "/Translate", Icon: GTranslateIcon },
      {
        title: "E commerce",
        href: "",
        Icon: StorefrontOutlined,
        children: [
          { title: "All Products", href: "/Dashboard/Ecommerce/Product" },
          { title: "Orders", href: "/Orders" },
          { title: "Sales", href: "/Sales" },
        ],
      },
      { title: "Blog", href: "/blog", Icon: ArticleOutlined },
      { title: "Subscription", href: "/subscription", Icon: CurrencyBitcoinOutlined },
      { title: "Email", href: "/email", Icon: EmailOutlined },
      { title: "Inquiry", href: "/inquiry", Icon: WorkOutlineOutlined },
      { title: "Invoice", href: "/invoice", Icon: ReceiptLongOutlined },
      { title: "Task", href: "/task", Icon: CheckBoxOutlined },
      { title: "Manage site", href: "/manage-site", Icon: StorefrontOutlined },
      { title: "Contact", href: "/contact", Icon: GroupOutlined },
      { title: "File Manager", href: "/file-manager", Icon: InsertDriveFileOutlined },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Fonction pour savoir si un item est actif (correspond à la route)
  const isActive = (href: string) => pathname === href;

  // Pour un parent avec children, on peut activer si un enfant est actif
  const isParentActive = (item: MenuItem) => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  return (
    <aside className={styles.sidebar}>
      <header className={styles.logo}>
        <Image src="/img/LOGO_light.png" alt="Logo" width={155} height={50} priority />
      </header>
      {MENU_SECTIONS.map((section) => (
        <nav key={section.label} className={styles.section}>
          <span className={styles.sectionLabel}>{section.label}</span>
          <ul className={styles.menuList}>
            {section.items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const active = isParentActive(item);

              return (
                <li key={item.title}>
                  <div
                    className={`${styles.menuItem} ${active ? styles.active : ""} ${openKeys[item.title] ? styles.open : ""}`}
                    onClick={() => hasChildren && toggle(item.title)}
                  >
                    {item.Icon && <item.Icon className={styles.icon} fontSize="small" />}
                    <Link href={item.href} className={styles.link}>
                      {item.title}
                    </Link>
                    {hasChildren && (
                      <KeyboardArrowDownRounded
                        className={`${styles.arrow} ${(openKeys[item.title] || active) ? styles.rotate : ""}`}
                        fontSize="small"
                      />
                    )}
                  </div>

                  {hasChildren && (openKeys[item.title] || active) && (
                    <ul className={styles.submenuList}>
                      {item.children!.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <li key={child.title} className={`${styles.submenuItem} ${childActive ? styles.activeSub : ""}`}>
                            <Link href={child.href} className={styles.link}>
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      ))}
    </aside>
  );
}
