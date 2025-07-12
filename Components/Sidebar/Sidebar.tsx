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

import { useCheckPermissions } from "@/hooks/useCheckPermissions";

import styles from "./Sidebar.module.css";

interface SubItem {
  title: string;
  href: string;
  permission?: string;
}

interface MenuItem {
  title: string;
  href: string;
  Icon?: ElementType;
  children?: SubItem[];
  permission?: string;
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    label: "MENU",
    items: [
      { title: "Dashboards", href: "/Dashboard", Icon: HomeRounded, permission: "dashboards" },
    ],
  },
  {
    label: "APPS",
    items: [
      {
        title: "Manage employe",
        href: "",
        Icon: GroupOutlined,
        permission: "manage employe",
        children: [
          { title: "Employe", href: "/Dashboard/Employe", permission: "manage employe" },
          { title: "Permission", href: "/Dashboard/Employe/Permission", permission: "permission" },
        ],
      },
      {
        title: "E commerce",
        href: "",
        Icon: StorefrontOutlined,
        permission: "e commerce",
        children: [
          { title: "All Products", href: "/Dashboard/Ecommerce/Product", permission: "e commerce" },
          { title: "Add Products", href: "/Dashboard/Ecommerce/AddProduct", permission: "e commerce" },
          { title: "Orders", href: "/Dashboard/Ecommerce/Orders", permission: "e commerce" },
        ],
      },
      {
        title: "Blog",
        href: "",
        Icon: ArticleOutlined,
        permission: "blog",
        children: [
          { title: "Blog Liste", href: "/Dashboard/blog", permission: "blog" },
          { title: "Add Blog", href: "/Dashboard/AddBlog", permission: "blog" },
        ],
      },
      {
        title: "Tracking",
        href: "",
        Icon: TrackChangesOutlined,
        permission: "tracking",
        children: [
          { title: "ARAMEX", href: "/Dashboard/Tracking", permission: "tracking" },
          { title: "DHL Group", href: "/Dashboard/Dhl", permission: "tracking" },
          { title: "CMA CGM", href: "/Sales", permission: "tracking" },
        ],
      },
      { title: "User", href: "/Dashboard/subscription", Icon: CardMembershipIcon, permission: "subscription" },
      { title: "Contact", href: "/Dashboard/contact", Icon: GroupOutlined, permission: "contact" },
      { title: "Inquiry", href: "/Dashboard/Demandes", Icon: WorkOutlineOutlined, permission: "inquiry" },
      { title: "Calendar", href: "/calendar", Icon: CalendarMonthOutlined, permission: "calendar" },
      { title: "Translate", href: "/Translate", Icon: GTranslateIcon, permission: "translate" },
      { title: "Email", href: "/email", Icon: EmailOutlined, permission: "email" },
      { title: "Invoice", href: "/invoice", Icon: ReceiptLongOutlined, permission: "invoice" },
      { title: "Task", href: "/task", Icon: CheckBoxOutlined, permission: "task" },
      { title: "Manage site", href: "/manage-site", Icon: StorefrontOutlined, permission: "manage site" },
      { title: "File Manager", href: "/file-manager", Icon: InsertDriveFileOutlined, permission: "file manager" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { permissions, loading, error, isAdmin } = useCheckPermissions();

  // Vérifie si le lien correspond au chemin actuel
  const isActive = (href: string) => pathname === href;

  // Vérifie si le parent ou un de ses enfants est actif
  const isParentActive = (item: MenuItem) =>
    isActive(item.href) || (item.children?.some(child => isActive(child.href)) ?? false);

  // État des menus ouverts
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MENU_SECTIONS.forEach(section =>
      section.items.forEach(item => {
        if (isParentActive(item)) initial[item.title] = true;
      }),
    );
    return initial;
  });

  const toggle = (key: string) =>
    setOpenKeys(prev => ({ ...prev, [key]: !prev[key] }));

  // Vérifie si l’utilisateur a la permission (en minuscule)
  const hasPermission = (perm?: string) => {
    if (isAdmin) return true;
    if (!perm) return true; // pas de permission requise => visible par tous
    return permissions.includes(perm.toLowerCase());
  };

  // Filtrer les items selon permissions, sauf si admin (tout visible)
  const filterItemsByPermissions = (items: MenuItem[]): MenuItem[] => {
    if (loading || error) return [];

    if (isAdmin) {
      // Admin voit tout
      return items;
    }

    return items
      .map(item => {
        if (!item.children) {
          return hasPermission(item.permission) ? item : null;
        }

        const filteredChildren = item.children.filter(child => hasPermission(child.permission));

        if (hasPermission(item.permission) || filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean) as MenuItem[];
  };

  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Sidebar menu">
      <header className={styles.logo}>
        <Image
          src="/img/LOGO_light.png"
          alt="Logo"
          width={155}
          height={50}
          priority
        />
      </header>

      {MENU_SECTIONS.map(section => {
        const filteredItems = filterItemsByPermissions(section.items);
        if (!filteredItems.length) return null;

        return (
          <nav key={section.label} className={styles.section} aria-label={section.label}>
            <span className={styles.sectionLabel}>{section.label}</span>

            <ul className={styles.menuList}>
              {filteredItems.map(item => {
                const hasChildren = !!item.children?.length;
                const active = isParentActive(item);
                const open = openKeys[item.title];

                return (
                  <li key={item.title}>
                    <div
                      className={`${styles.menuItem} ${active ? styles.active : ""} ${open ? styles.open : ""}`}
                      onClick={() => hasChildren && toggle(item.title)}
                      role={hasChildren ? "button" : undefined}
                      tabIndex={hasChildren ? 0 : undefined}
                      onKeyDown={e => {
                        if (hasChildren && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          toggle(item.title);
                        }
                      }}
                      aria-expanded={hasChildren ? open : undefined}
                      aria-haspopup={hasChildren ? "true" : undefined}
                    >
                      {item.Icon && (
                        <item.Icon className={styles.icon} fontSize="small" aria-hidden="true" />
                      )}

                      <Link href={item.href || "#"} className={styles.link} tabIndex={-1}>
                        {item.title}
                      </Link>

                      {hasChildren && (
                        <KeyboardArrowDownRounded
                          className={`${styles.arrow} ${open ? styles.rotate : ""}`}
                          fontSize="small"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {hasChildren && open && (
                      <ul className={styles.submenuList}>
                        {item.children!.map(child => (
                          <li
                            key={child.title}
                            className={`${styles.submenuItem} ${isActive(child.href) ? styles.activeSub : ""}`}
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
        );
      })}
    </aside>
  );
}
