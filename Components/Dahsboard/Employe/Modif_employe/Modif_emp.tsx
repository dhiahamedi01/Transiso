"use client";

import React, { useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import style from "./Modif_emp.module.css";
import ImageUploader from "./ImageUploader";
import Link from 'next/link';

function ADD_emp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    permission: "",
    password: "",
    confirmPassword: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      permission: "",
      password: "",
      confirmPassword: "",
    });
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        open: true,
        message: "Les mots de passe ne correspondent pas",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k !== "confirmPassword") data.append(k, v);
      });
      if (imageFile) data.append("image", imageFile);

      const res = await axios.post("/api/employees", data);
      const result = res.data;

      if (result.success) {
        setAlert({
          open: true,
          message: "Employé ajouté avec succès !",
          severity: "success",
        });
        resetForm();
      } else {
        setAlert({
          open: true,
          message: result.error || "Erreur lors de l'ajout",
          severity: "error",
        });
      }
    } catch (err: any) {
      console.error(err);
      setAlert({
        open: true,
        message: err.message || "Erreur serveur",
        severity: "error",
      });
    }
    setLoading(false);
  };

  return (
    <form className={style.card} onSubmit={handleSubmit}>
      <div className={style.header}>Basic Details</div>

      <ImageUploader onFileSelect={setImageFile} />

      {/* Row 1 */}
      <div className={style.inlineInputs}>
        <div className={style.inputWrapper}>
          <label htmlFor="firstName">First Name</label>
          <span className={style.icon}>
            <PersonIcon fontSize="small" />
          </span>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="lastName">Last Name</label>
          <span className={style.icon}>
            <PersonIcon fontSize="small" />
          </span>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="email">Email</label>
          <span className={style.icon}>
            <EmailIcon fontSize="small" />
          </span>
          <input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className={style.inlineInputs}>
        <div className={style.inputWrapper}>
          <label htmlFor="phone">Phone</label>
          <span className={style.icon}>
            <PhoneIcon fontSize="small" />
          </span>
          <input
            id="phone"
            type="tel"
            placeholder="+216 00 000 000"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="location">Location</label>
          <span className={style.icon}>
            <LocationOnIcon fontSize="small" />
          </span>
          <input
            id="location"
            type="text"
            placeholder="Tunis"
            value={formData.location}
            onChange={handleChange}
            autoComplete="address-level2"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="permission">Permission</label>
          <select
            id="permission"
            value={formData.permission}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Row 3 – Passwords */}
      <div className={style.inlineInputs}>
        <div className={style.inputWrapper}>
          <label htmlFor="password">Password</label>
          <span className={style.icon}>
            <LockIcon fontSize="small" />
          </span>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <span className={style.icon}>
            <LockIcon fontSize="small" />
          </span>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirmez le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
      </div>

      {/* Action bar */}
      <div className={style.actionBar}>
      <Link href="/Employe" passHref legacyBehavior>
        <button type="button" className={style.cancelBtn} onClick={resetForm}>
          Cancel
        </button>
      </Link>
        <button type="submit" className={style.addBtn} disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : "Add Employee"}
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default ADD_emp;

