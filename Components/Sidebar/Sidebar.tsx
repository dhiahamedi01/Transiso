'use client';

import { useState } from "react";
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

// Pour Tracking, il n'y a pas d'icône TrackingOutlined dans MUI par défaut,
// on peut remplacer par quelque chose de proche comme TrackChangesOutlined ou autre.

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
        children: [
          { title: "Statistics", href: "/Dashboard" },
          { title: "Analytics", href: "/Dashboard" },
          { title: "Sales", href: "/Dashboard" },
        ],
      },
    ],
  },
  {
    label: "APPS",
    items: [
      { title: "Gestion employe", href: "/gestion-employe", Icon: GroupOutlined },
      { title: "Calendar", href: "/calendar", Icon: CalendarMonthOutlined },
      { title: "Tracking", href: "/tracking", Icon: TrackChangesOutlined },
      { title: "E commerce", href: "/Dashboard", Icon: StorefrontOutlined ,children: [
        { title: "Orders", href: "/Dashboard" },
        { title: "Analytics", href: "/Dashboard" },
        { title: "Sales", href: "/Dashboard" },
      ],},
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
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
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

              return (
                <li key={item.title}>
                  <div
                    className={`${styles.menuItem} ${openKeys[item.title] ? styles.open : ""}`}
                    onClick={() => hasChildren && toggle(item.title)}
                  >
                    {item.Icon && <item.Icon className={styles.icon} fontSize="small" />}
                    <Link href={item.href} className={styles.link}>
                      {item.title}
                    </Link>
                    {hasChildren && (
                      <KeyboardArrowDownRounded
                        className={`${styles.arrow} ${openKeys[item.title] ? styles.rotate : ""}`}
                        fontSize="small"
                      />
                    )}
                  </div>

                  {hasChildren && openKeys[item.title] && (
                    <ul className={styles.submenuList}>
                      {item.children!.map((child) => (
                        <li key={child.title} className={styles.submenuItem}>
                          <Link href={child.href} className={styles.link}>
                            {child.title}
                          </Link>
                        </li>
                      ))}
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
