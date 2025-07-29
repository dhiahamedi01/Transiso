"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface SliderItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  image: string;
  lang?: string;
}

async function fetchSliders(): Promise<SliderItem[]> {
  const res = await fetch('/api/home-slider', { cache: 'no-store' });
  if (!res.ok) throw new Error('Error loading sliders');

  const data: {
    id: number;
    Icon: string | null;
    Titre: string | null;
    Description: string | null;
    Image: string | null;
    lang: string;
  }[] = await res.json();

  return data.map(item => ({
    id: item.id,
    icon: item.Icon ?? '',
    title: item.Titre ?? '',
    description: item.Description ?? '',
    image: item.Image ?? '',
    lang: item.lang,
  }));
}

async function deleteSlider(id: number) {
  const res = await fetch(`/api/home-slider/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error during deletion');
}

function ModalConfirm({
  title,
  message,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalCard}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={style.modalActions}>
          <button className={style.cancelBtn} onClick={onCancel}>Cancel</button>
          <button className={style.deleteBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function SliderList() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState<SliderItem | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSliders();
        setSliders(data);
      } catch {
        setError('Unable to load sliders');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredSliders = sliders
    .filter(slider => slider.lang === selectedLang)
    .filter(slider =>
      (slider.title ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

  const openDeleteModal = (slider: SliderItem) => {
    setSliderToDelete(slider);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!sliderToDelete) return;

    try {
      await deleteSlider(sliderToDelete.id);
      setSliders(prev => prev.filter(s => s.id !== sliderToDelete.id));
      setShowModal(false);
      setSliderToDelete(null);
    } catch {
      alert('Error during deletion');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.card}>
      <h4 style={{ marginBottom: '2rem' }}>Sliders List</h4>

      <div className={style.actionRow}>
        <input
          type="text"
          placeholder="Search by title..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Lang</InputLabel>
          <Select
            value={selectedLang}
            label="Lang"
            onChange={(e: SelectChangeEvent<string>) => setSelectedLang(e.target.value)}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
            <MenuItem value="tr">TR</MenuItem>
          </Select>
        </FormControl>

        <Link href="/Dashboard/Image_Slider/AddSlider" className={style.addButtonSmall}>
          <AddIcon fontSize="small" /> New Slider
        </Link>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Image</th>
              <th className={style.tableHeader}>Icon</th>
              <th className={style.tableHeader}>Title</th>
              <th className={style.tableHeader}>Description</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSliders.map(slider => (
              <tr key={slider.id} className={style.tableRow}>
                <td className={style.tableData}>
                  <Image
                    src={slider.image}
                    alt={slider.title}
                    width={80}
                    height={50}
                    style={{ borderRadius: '6px', objectFit: 'cover' }}
                  />
                </td>
                <td className={style.tableData}>
                  <Image
                    src={slider.icon}
                    alt="icon"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain', filter: 'invert(0) brightness(0)' }}
                  />
                </td>
                <td className={style.tableData}>{slider.title}</td>
                <td className={style.tableData}>{slider.description}</td>
                <td className={style.tableData}>
                  <div className={style.actionButtonsWrapper}>
                    <Link href={`/Dashboard/Image_Slider/${slider.id}`} className={style.viewButton} title="Edit">
                      <EditDocumentIcon fontSize="small" />
                    </Link>
                    <button
                      className={style.deleteButton}
                      title="Delete"
                      onClick={() => openDeleteModal(slider)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && sliderToDelete && (
        <ModalConfirm
          title="Confirm Deletion"
          message={`Are you sure you want to delete the slider "${sliderToDelete.title}"?`}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default SliderList;
