'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './LanguageSelector.module.css';

const languages = [
  { code: 'EN', label: 'EN', flag: '/img/flags/eng.jpg' },
  { code: 'TR', label: 'TR', flag: '/img/flags/tr.jpg' },
  { code: 'AR', label: 'AR', flag: '/img/flags/AR.jpg' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: typeof selectedLang) => {
    setSelectedLang(lang);
    setIsOpen(false);
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
