import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import style from "./Modif_emp.module.css";
import ImageUploader from "./ImageUploader";

/**
 * Modif_emp — fiche employé complète
 * - Image en haut
 * - 2 lignes d'inputs
 * - Barre d'actions Cancel / Add Employee
 */
function Modif_emp() {
  return (
    <div className={style.card}>
      <div className={style.header}>Basic Details</div>

      {/* Uploader d'image en haut */}
      <ImageUploader />

      {/* Ligne 1 d'inputs */}
      <div className={style.inlineInputs}>
        {/* First Name */}
        <div className={style.inputWrapper}>
          <label htmlFor="firstName">First Name</label>
          <span className={style.icon}>
            <PersonIcon fontSize="small" />
          </span>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            autoComplete="given-name"
          />
        </div>

        {/* Last Name */}
        <div className={style.inputWrapper}>
          <label htmlFor="lastName">Last Name</label>
          <span className={style.icon}>
            <PersonIcon fontSize="small" />
          </span>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            autoComplete="family-name"
          />
        </div>

        {/* Email */}
        <div className={style.inputWrapper}>
          <label htmlFor="email">Email</label>
          <span className={style.icon}>
            <EmailIcon fontSize="small" />
          </span>
          <input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      {/* Ligne 2 d'inputs */}
      <div className={style.inlineInputs}>
        {/* Phone */}
        <div className={style.inputWrapper}>
          <label htmlFor="phone">Phone</label>
          <span className={style.icon}>
            <PhoneIcon fontSize="small" />
          </span>
          <input
            id="phone"
            type="tel"
            placeholder="+216 00 000 000"
            autoComplete="tel"
          />
        </div>

        {/* Location */}
        <div className={style.inputWrapper}>
          <label htmlFor="location">Location</label>
          <span className={style.icon}>
            <LocationOnIcon fontSize="small" />
          </span>
          <input
            id="location"
            type="text"
            placeholder="Tunis"
            autoComplete="address-level2"
          />
        </div>

        {/* Permission */}
        <div className={style.inputWrapper}>
          <label htmlFor="permission">Permission</label>
          <select id="permission" defaultValue="">
            <option value="" disabled>
              Select role
            </option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Barre d'actions */}
      <div className={style.actionBar}>
        <button type="button" className={style.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={style.addBtn}>
          Add Employee
        </button>
      </div>
    </div>
  );
}

export default Modif_emp;
