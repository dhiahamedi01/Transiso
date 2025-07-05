"use client";

import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import style from "./Modif_emp.module.css";
import ImageUploader from "./ImageUploader";
import Link from "next/link";
import { useAddEmployee } from "@/hooks/useAddEmployee";

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

  const { loading, error, success, submitEmployee, setError, setSuccess } = useAddEmployee();

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
    setError(null);
    setSuccess(false);
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [success, error, setError, setSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k !== "confirmPassword") data.append(k, v);
    });
    if (imageFile) data.append("image", imageFile);

    await submitEmployee(data);

    if (success) resetForm();
  };

  return (
    <>
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
        <Link href="/Employe">
          <button type="button" className={style.cancelBtn} onClick={resetForm}>
            Cancel
          </button>
        </Link>

          <button type="submit" className={style.addBtn} disabled={loading}>
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Add Employee"
            )}
          </button>
        </div>
      </form>

      {/* Snackbar */}
      <Snackbar
        open={error !== null || success}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setSuccess(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setError(null);
            setSuccess(false);
          }}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ?? "Employé ajouté avec succès !"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ADD_emp;
