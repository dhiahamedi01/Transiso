'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';   // <-- importer axios
import style from '@/Components/Dahsboard/Employe/Ajoute_employe/Modif_emp.module.css';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import Link from 'next/link';
import ImageUploader from '../../Dahsboard/Employe/Ajoute_employe/ImageUploader';
import { useEditEmployee } from '@/hooks/useEditEmployee';

export default function modif_user({ employeeId }: { employeeId: string }) {
  const { initial, loading, saving, error, success, submit, setError, setSuccess } =
    useEditEmployee(employeeId);

  const [form, setForm] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [groups, setGroups] = useState<{ user_name: string }[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  useEffect(() => {
    async function fetchGroups() {
      setLoadingGroups(true);
      try {
        const res = await axios.get('/api/permissions/groups');  // axios
        setGroups(res.data);
        setGroupsError(null);
      } catch (err) {
        console.error("Erreur chargement permissions :", err);
        setGroupsError('Erreur lors du chargement des groupes');
      } finally {
        setLoadingGroups(false);
      }
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [success, error, setError, setSuccess]);

  if (loading || !form) return <p className={style.info}>Loading…</p>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    const fd = new FormData();
    ['firstName','lastName','email','phone','location','permission','password'].forEach(k => {
      if (form[k]) fd.append(k, form[k]);
    });
    if (imageFile) fd.append('image', imageFile);

    await submit(fd);
  };

  return (
    <>
      <form className={style.card} onSubmit={onSubmit}>
        <div className={style.header}>Edit Employee</div>

        <ImageUploader initial={form.image || undefined} onFileSelect={setImageFile} />

        {/* Row 1 */}
        <div className={style.inlineInputs}>
          <div className={style.inputWrapper}>
            <label htmlFor="firstName">Full Name</label>
            <span className={style.icon}><PersonIcon fontSize="small" /></span>
            <input id="firstName" value={form.firstName} onChange={onChange} required />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="email">Email</label>
            <span className={style.icon}><EmailIcon fontSize="small" /></span>
            <input id="email" type="email" value={form.email} onChange={onChange} required />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="phone">Phone</label>
            <span className={style.icon}><PhoneIcon fontSize="small" /></span>
            <input id="phone" value={form.phone} onChange={onChange} />
          </div>
        </div>

        {/* Row 2 */}
        <div className={style.inlineInputs}>
     
          <div className={style.inputWrapper}>
            <label htmlFor="location">Location</label>
            <span className={style.icon}><LocationOnIcon fontSize="small" /></span>
            <input id="location" value={form.location} onChange={onChange} />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="password">New Password</label>
            <span className={style.icon}><LockIcon fontSize="small" /></span>
            <input id="password" type="password" value={form.password} onChange={onChange} />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span className={style.icon}><LockIcon fontSize="small" /></span>
            <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={onChange} />
          </div>
        </div>


        {/* Action bar */}
        <div className={style.actionBar} style={{display:'flex',justifyContent:'right',marginRight:'20px'}}>
          <button type="submit" className={style.addBtn} disabled={saving} >
            {saving ? <CircularProgress size={20} color="inherit" /> : 'Save'}
          </button>
        </div>
      </form>

      {/* Snackbar */}
      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        onClose={() => { setError(null); setSuccess(false); }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => { setError(null); setSuccess(false); }}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error ?? 'Employé mis à jour !'}
        </Alert>
      </Snackbar>
    </>
  );
}
