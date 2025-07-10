"use client";

import React, { useState, useEffect } from "react";
import styles from "./GroupPermissionForm.module.css";
import Link from "next/link";

interface Permission {
  id: number;
  name: string;
}

export default function GroupPermissionForm() {
  const [userName, setUserName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    fetch("/api/permissions")
      .then((res) => res.json())
      .then(setPermissions)
      .catch(() => setMessage("Error loading permissions"))
      .finally(() => setLoadingPermissions(false));
  }, []);

  const togglePermission = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoadingSubmit(true);

    if (!userName.trim() || selected.length === 0) {
      setMessage("Please fill out all fields");
      setLoadingSubmit(false);
      return;
    }

    try {
      const res = await fetch("/api/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, selectedPermissions: selected }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Server error");
      } else {
        setMessage("Group created successfully!");
        setUserName("");
        setSelected([]);
      }
    } catch {
      setMessage("Submission error");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.header}>Create a Permission Group</div>

      <div className={styles.inputWrapper}>
        <label htmlFor="username">Group Name:</label>
        <input
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Ex: Gestionnaire de stock"
          required
        />
      </div>

      <div className={styles.inputWrapper}>
        <label>Select Permissions:</label>
        {loadingPermissions ? (
          <div className={styles.loadingSpinner} />
        ) : permissions.length === 0 ? (
          <p>No permissions available</p>
        ) : (
          <div className={styles.permissionsList}>
            {permissions.map((perm) => (
              <label key={perm.id} className={styles.permissionItem}>
                <input
                  type="checkbox"
                  checked={selected.includes(perm.id)}
                  onChange={() => togglePermission(perm.id)}
                />
                {perm.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actionBar}>
        <Link href="/Dashboard/Employe">
          <button type="button" className={styles.cancelBtn}>
            Cancel
          </button>
        </Link>
        <button type="submit" className={styles.addBtn} disabled={loadingSubmit}>
          {loadingSubmit ? <span className={styles.smallLoader} /> : "Create Group"}
        </button>
      </div>

      {message && (
        <p className={styles.message} style={{ color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </form>
  );
}
