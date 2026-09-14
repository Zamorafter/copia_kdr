import React, { useState } from 'react';
import { X, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './admin.css';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { login, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setErrorMsg(
        err.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : err.message || 'Error al conectar con Supabase.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-card" onClick={(e) => e.stopPropagation()}>
        <button className="admin-modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="admin-title-row">
          <div className="admin-title-icon">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="admin-title">Panel Admin</h2>
            <p className="admin-subtitle" style={{ marginBottom: 0 }}>
              Ingreso exclusivo para gestión del catálogo
            </p>
          </div>
        </div>

        {!isConfigured && (
          <div className="admin-alert admin-alert-warning" style={{ marginTop: '1rem' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Supabase no configurado aún</strong>
              <p style={{ marginTop: '0.25rem', fontSize: '0.8rem' }}>
                Coloca tus claves <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code> en tu archivo <code>.env</code> para habilitar el backend.
              </p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="admin-alert admin-alert-error" style={{ marginTop: '1rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Correo electrónico</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="admin-input"
                placeholder="admin@urbanglow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Contraseña</label>
            <input
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn-primary"
            disabled={loading || !isConfigured}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar al Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}
