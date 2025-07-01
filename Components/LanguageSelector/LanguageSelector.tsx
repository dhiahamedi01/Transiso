'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styles from './LanguageSelector.module.css';

const languages = [
  { code: 'en', label: 'EN', flag: '/img/flags/eng.jpg' },
  { code: 'tr', label: 'TR', flag: '/img/flags/tr.jpg' },
  { code: 'ar', label: 'AR', flag: '/img/flags/AR.jpg' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const current = languages.find(lang => lang.code === i18n.language);
    if (current) setSelectedLang(current);
  }, [i18n.language]);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (lang: typeof languages[number]) => {
    setSelectedLang(lang);
    setIsOpen(false);
    i18n.changeLanguage(lang.code);
  };
  

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <img src={selectedLang.flag} alt={selectedLang.label} width={20} height={14} />
        <span>{selectedLang.label}</span>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {languages.map(lang => (
            <div
              key={lang.code}
              className={styles.option}
              onClick={() => handleSelect(lang)}
            >
              <Image src={lang.flag} alt={lang.label} width={20} height={14} />
              <span>{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
