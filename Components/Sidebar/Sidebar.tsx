'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { ElementType } from "react";
import Link from "next/link";
import Image from "next/image";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
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
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { TrackChangesOutlined } from "@mui/icons-material";

import styles from "./Sidebar.module.css";

/* ---------- types ---------- */
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

/* ---------- menu data ---------- */
const MENU_SECTIONS: MenuSection[] = [
  {
    label: "MENU",
    items: [
      { title: "Dashboards", href: "/Dashboard", Icon: HomeRounded },
    ],
  },
  {
    label: "APPS",
    items: [
      {
        title: "Manage employe",
        href: "",
        Icon: GroupOutlined,
        children: [
          { title: "Employer", href: "/Dashboard/Employe" },
          { title: "Permission", href: "/Dashboard/Employe/Permission" },
        ],
      },
      {
        title: "E commerce",
        href: "",
        Icon: StorefrontOutlined,
        children: [
          { title: "All Products", href: "/Dashboard/Ecommerce/Product" },
          { title: "Add Products", href: "/Dashboard/Ecommerce/AddProduct" },
          { title: "Orders", href: "/Dashboard/Ecommerce/Orders" },
        ],
      },
      { title: "Blog", href: "", Icon: ArticleOutlined ,
        children: [
          { title: "Blog Liste", href: "/Dashboard/blog" },
          { title: "Add Blog", href: "/Dashboard/AddBlog" },
        ],
      },
      {
        title: "Tracking",
        href: "",
        Icon: TrackChangesOutlined,
        children: [
          { title: "ARAMEX", href: "/Dashboard/Tracking" },
          { title: "DHL Group", href: "/Analytics" },
          { title: "CMA CGM", href: "/Sales" },
        ],
      },
      { title: "Subscription", href: "/Dashboard/subscription", Icon: CardMembershipIcon },
      { title: "Contact", href: "/contact", Icon: GroupOutlined },
      { title: "Calendar", href: "/calendar", Icon: CalendarMonthOutlined },
      { title: "Translate", href: "/Translate", Icon: GTranslateIcon },
      { title: "Email", href: "/email", Icon: EmailOutlined },
      { title: "Inquiry", href: "/inquiry", Icon: WorkOutlineOutlined },
      { title: "Invoice", href: "/invoice", Icon: ReceiptLongOutlined },
      { title: "Task", href: "/task", Icon: CheckBoxOutlined },
      { title: "Manage site", href: "/manage-site", Icon: StorefrontOutlined },
      { title: "File Manager", href: "/file-manager", Icon: InsertDriveFileOutlined },
    ],
  },
];

/* ---------- component ---------- */
export default function Sidebar() {
  const pathname = usePathname();

  /* --- helpers -------------------------------------------------------- */
  const isActive = (href: string) => pathname === href;

  const isParentActive = (item: MenuItem) =>
    isActive(item.href) ||
    (item.children?.some(child => isActive(child.href)) ?? false);

  /* --- state: which parents are open --------------------------------- */
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MENU_SECTIONS.forEach(section =>
      section.items.forEach(item => {
        if (isParentActive(item)) initial[item.title] = true; // open by default if active
      }),
    );
    return initial;
  });

  const toggle = (key: string) =>
    setOpenKeys(prev => ({ ...prev, [key]: !prev[key] }));

  /* --- render --------------------------------------------------------- */
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

      {MENU_SECTIONS.map(section => (
        <nav key={section.label} className={styles.section}>
          <span className={styles.sectionLabel}>{section.label}</span>

          <ul className={styles.menuList}>
            {section.items.map(item => {
              const hasChildren = !!item.children?.length;
              const active = isParentActive(item);
              const open = openKeys[item.title];

              return (
                <li key={item.title}>
                  {/* parent item */}
                  <div
                    className={`${styles.menuItem}
                                ${active ? styles.active : ""}
                                ${open ? styles.open : ""}`}
                    onClick={() => hasChildren && toggle(item.title)}
                  >
                    {item.Icon && (
                      <item.Icon className={styles.icon} fontSize="small" />
                    )}

                    <Link href={item.href} className={styles.link}>
                      {item.title}
                    </Link>

                    {hasChildren && (
                      <KeyboardArrowDownRounded
                        className={`${styles.arrow} ${open ? styles.rotate : ""}`}
                        fontSize="small"
                      />
                    )}
                  </div>

                  {/* sub‑items */}
                  {hasChildren && open && (
                    <ul className={styles.submenuList}>
                      {item.children!.map(child => (
                        <li
                          key={child.title}
                          className={`${styles.submenuItem}
                                      ${isActive(child.href) ? styles.activeSub : ""}`}
                        >
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
