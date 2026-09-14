import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Upload,
  RefreshCw,
  LogOut,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  createShirt,
  updateShirt,
  deleteShirt,
  seedInitialShirts
} from '../../services/shirtService';
import './admin.css';

const DEFAULT_FORM = {
  name: '',
  tag: 'NUEVO DROP',
  category: 'Streetwear',
  description: '',
  image: '',
  color3D: '#161824',
  accentColor: '#e1306c',
};

const CATEGORIES = ['Streetwear', 'Racing', 'Oversized', 'Edición Especial', 'Anime'];
const TAGS = ['NUEVO DROP', 'EXCLUSIVO', 'TENDENCIA', 'EDICIÓN LIMITADA', 'POPULAR'];

export default function AdminPanel({
  isOpen,
  onClose,
  shirts,
  onRefreshShirts
}) {
  const { user, logout, isConfigured } = useAuth();
  const [editingShirt, setEditingShirt] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  if (!isOpen) return null;

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4000);
  };

  const handleOpenCreate = () => {
    setEditingShirt(null);
    setFormData(DEFAULT_FORM);
    setImageFile(null);
    setImagePreview('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (shirt) => {
    setEditingShirt(shirt);
    setFormData({
      name: shirt.name,
      tag: shirt.tag || 'NUEVO DROP',
      category: shirt.category || 'Streetwear',
      description: shirt.description || '',
      image: shirt.image || '',
      color3D: shirt.color3D || '#161824',
      accentColor: shirt.accentColor || '#e1306c',
    });
    setImageFile(null);
    setImagePreview(shirt.image || '');
    setIsFormOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showNotification('error', 'El nombre de la prenda es requerido');
      return;
    }

    if (!imageFile && !formData.image) {
      showNotification('error', 'Debes subir una imagen o ingresar una URL');
      return;
    }

    setSubmitting(true);
    try {
      if (editingShirt) {
        await updateShirt(editingShirt.id, formData, imageFile);
        showNotification('success', '¡Prenda actualizada correctamente!');
      } else {
        await createShirt(formData, imageFile);
        showNotification('success', '¡Nueva prenda agregada al catálogo!');
      }

      setIsFormOpen(false);
      if (onRefreshShirts) onRefreshShirts();
    } catch (err) {
      console.error(err);
      showNotification('error', err.message || 'Error al guardar la prenda');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (shirt) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar "${shirt.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmDelete) return;

    try {
      await deleteShirt(shirt.id, shirt.image);
      showNotification('success', 'Prenda eliminada correctamente.');
      if (onRefreshShirts) onRefreshShirts();
    } catch (err) {
      console.error(err);
      showNotification('error', err.message || 'Error al eliminar la prenda');
    }
  };

  const handleSeed = async () => {
    const confirmSeed = window.confirm(
      '¿Deseas importar el catálogo inicial a tu base de datos de Supabase?'
    );
    if (!confirmSeed) return;

    setSubmitting(true);
    try {
      await seedInitialShirts();
      showNotification('success', '¡Catálogo inicial importado a Supabase!');
      if (onRefreshShirts) onRefreshShirts();
    } catch (err) {
      console.error(err);
      showNotification('error', err.message || 'Error al sincronizar catálogo');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-panel-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button className="admin-modal-close" onClick={onClose} aria-label="Cerrar panel">
          <X size={18} />
        </button>

        {/* Encabezado del Panel */}
        <div className="admin-panel-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles color="#e1306c" size={22} />
              <h2 className="admin-title">Panel de Control de Productos</h2>
            </div>
            <p className="admin-subtitle" style={{ marginBottom: 0, marginTop: '0.2rem' }}>
              Sesión iniciada como: <strong style={{ color: '#fff' }}>{user?.email}</strong>
            </p>
          </div>

          <div className="admin-header-actions">
            {isConfigured && (
              <button
                className="admin-btn-secondary"
                onClick={handleSeed}
                title="Poblar la base de datos con las prendas base"
                disabled={submitting}
              >
                <Database size={16} />
                <span>Poblar Base de Datos</span>
              </button>
            )}

            <button className="admin-btn-primary" onClick={handleOpenCreate} style={{ width: 'auto' }}>
              <Plus size={18} />
              <span>Nueva Prenda</span>
            </button>

            <button
              className="admin-btn-secondary"
              onClick={() => {
                logout();
                onClose();
              }}
              title="Cerrar sesión"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        {feedback.message && (
          <div
            className={`admin-alert ${
              feedback.type === 'error'
                ? 'admin-alert-error'
                : 'admin-alert-success'
            }`}
          >
            {feedback.type === 'error' ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Tabla de Productos */}
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Catálogo Activo ({shirts.length} prendas)
          </h3>
          <button
            className="admin-btn-secondary"
            onClick={onRefreshShirts}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            <RefreshCw size={14} />
            <span>Refrescar</span>
          </button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Tag</th>
                <th>Categoría</th>
                <th>Color 3D</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shirts.map((shirt) => (
                <tr key={shirt.id}>
                  <td>
                    <img
                      src={shirt.image}
                      alt={shirt.name}
                      className="admin-thumb"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x50?text=Camisa';
                      }}
                    />
                  </td>
                  <td>
                    <strong style={{ color: '#fff' }}>{shirt.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {shirt.description}
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge-tag">{shirt.tag}</span>
                  </td>
                  <td>{shirt.category}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: shirt.color3D || '#161824',
                          border: '1px solid #ffffff33',
                        }}
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {shirt.color3D || '#161824'}
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        className="admin-btn-secondary"
                        onClick={() => handleOpenEdit(shirt)}
                        style={{ padding: '0.4rem 0.7rem' }}
                        title="Editar prenda"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="admin-btn-danger"
                        onClick={() => handleDelete(shirt)}
                        title="Eliminar prenda"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal / Formulario para Crear / Editar Prenda */}
        {isFormOpen && (
          <div
            className="admin-modal-backdrop"
            style={{ zIndex: 11000 }}
            onClick={() => setIsFormOpen(false)}
          >
            <div
              className="admin-card"
              style={{ maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="admin-modal-close"
                onClick={() => setIsFormOpen(false)}
              >
                <X size={18} />
              </button>

              <div className="admin-title-row">
                <div className="admin-title-icon">
                  {editingShirt ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                <div>
                  <h2 className="admin-title">
                    {editingShirt ? 'Editar Prenda' : 'Nueva Prenda'}
                  </h2>
                  <p className="admin-subtitle" style={{ marginBottom: 0 }}>
                    Completa los detalles para exhibir en la tienda
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Nombre del modelo *</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Ej: Urban Samurai Armor Tee"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Categoría</label>
                    <select
                      className="admin-select"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Etiqueta / Badge</label>
                    <select
                      className="admin-select"
                      value={formData.tag}
                      onChange={(e) =>
                        setFormData({ ...formData, tag: e.target.value })
                      }
                    >
                      {TAGS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Descripción</label>
                  <textarea
                    className="admin-textarea"
                    placeholder="Describe la tela, estampado, detalles de diseño..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Subida de Imagen */}
                <div className="admin-form-group">
                  <label className="admin-label">Foto del producto *</label>
                  <label className="admin-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <Upload size={28} color="#e1306c" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      Haz clic para subir una imagen desde tu equipo
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                      PNG, JPG o WEBP (recomendado relación 1:1 o vertical)
                    </p>
                  </label>

                  {/* O ingresar URL manual si lo prefiere */}
                  <div style={{ marginTop: '0.6rem' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="O pega una URL de imagen directamente (ej: https://...)"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                    />
                  </div>

                  {imagePreview && (
                    <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Vista previa:
                      </p>
                      <img
                        src={imagePreview}
                        alt="Previa"
                        className="admin-preview-img"
                      />
                    </div>
                  )}
                </div>

                {/* Colores 3D */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Color base 3D</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="color"
                        value={formData.color3D}
                        onChange={(e) =>
                          setFormData({ ...formData, color3D: e.target.value })
                        }
                        style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={formData.color3D}
                        onChange={(e) =>
                          setFormData({ ...formData, color3D: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Color acento 3D</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) =>
                          setFormData({ ...formData, accentColor: e.target.value })
                        }
                        style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={formData.accentColor}
                        onChange={(e) =>
                          setFormData({ ...formData, accentColor: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => setIsFormOpen(false)}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="admin-btn-primary"
                    disabled={submitting}
                    style={{ flex: 2 }}
                  >
                    {submitting
                      ? 'Guardando...'
                      : editingShirt
                      ? 'Actualizar Prenda'
                      : 'Crear Prenda'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
