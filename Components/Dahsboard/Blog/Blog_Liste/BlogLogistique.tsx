'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';

import { fetchBlogs, BlogArticle } from '@/services/blogService';
import { deleteBlog } from '@/services/deleteBlog';

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
          <button className={style.cancelBtn} onClick={onCancel}>
            Annuler
          </button>
          <button className={style.deleteBtn} onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

function Transaction() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogArticle | null>(null);

  // Charger les blogs au montage
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err: any) {
        setError('Impossible de charger les articles.');
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  // Filtrage selon recherche
  const filteredBlogs = blogs.filter(blog =>
    [blog.title, blog.author, blog.category]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusClass = (status: string) =>
    status === 'Published' ? style.statusDelivered : style.statusDelayed;

  // Ouvre le modal de confirmation de suppression
  const openDeleteModal = (blog: BlogArticle) => {
    setBlogToDelete(blog);
    setShowModal(true);
  };

  // Confirme la suppression
  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      await deleteBlog(blogToDelete.id);
      setBlogs(prev => prev.filter(b => b.id !== blogToDelete.id));
      setShowModal(false);
      setBlogToDelete(null);
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) return <p>Chargement…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.card}>
      <h4 style={{ marginBottom: '2rem' }}>Blog List</h4>

      <div className={style.actionRow}>
        <input
          type="text"
          placeholder="Search for an article..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link href="/Dashboard/AddBlog" className={style.addButtonSmall}>
          <AddIcon fontSize="small" /> New Article
        </Link>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Image</th>
              <th className={style.tableHeader}>Title</th>
              <th className={style.tableHeader}>Author</th>
              <th className={style.tableHeader}>Date</th>
              <th className={style.tableHeader}>Status</th>
              <th className={style.tableHeader}>Category</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className={style.tableRow}>
                <td className={style.tableData}>
                  <Image
                    src={blog.image_path || '/img/default.jpg'}
                    alt={blog.title}
                    width={60}
                    height={40}
                    style={{ borderRadius: '6px' }}
                  />
                </td>
                <td className={style.tableData}>{blog.title}</td>
                <td className={style.tableData}>{blog.author}</td>
                <td className={style.tableData}>{blog.date}</td>
                <td className={style.tableData}>
                  <span className={`${style.statusChip} ${getStatusClass(blog.status)}`}>
                    {blog.status}
                  </span>
                </td>
                <td className={style.tableData}>{blog.category}</td>
                <td className={style.tableData}>
                  <div className={style.actionButtonsWrapper}>
                  <Link href={`/Dashboard/blog/${blog.id}`} className={style.viewButton} title="Edit">
                    <EditDocumentIcon fontSize="small" />
                  </Link>


                    <button
                      className={style.deleteButton}
                      title="Delete"
                      onClick={() => openDeleteModal(blog)}
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

      {/* Modal de confirmation */}
      {showModal && blogToDelete && (
        <ModalConfirm
          title="Confirmer la suppression"
          message={`Voulez-vous vraiment supprimer l'article "${blogToDelete.title}" ?`}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default Transaction;
