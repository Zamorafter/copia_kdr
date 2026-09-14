import React from 'react';
import { Instagram, ShoppingBag, Shield } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAdmin }) {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo de la Marca */}
        <a href="#" className="logo-brand">
          <div className="logo-icon">
            <ShoppingBag size={20} color="#ffffff" />
          </div>
          <span className="logo-text">
            URBAN <span className="gradient-text-ig">GLOW</span>
          </span>
        </a>

        {/* Botones de Navegación */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Botón Admin */}
          <button
            onClick={onOpenAdmin}
            className={`nav-admin-btn ${isAuthenticated ? 'is-active' : ''}`}
            title={isAuthenticated ? 'Abrir panel de administración (Conectado)' : 'Acceso Administrador'}
          >
            <Shield size={15} />
            <span>Admin</span>
          </button>

          {/* Botón de Enlace a Instagram Oficial */}
          <a
            href={WHATSAPP_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-ig"
            title="Ir al Instagram oficial de Urban Glow"
          >
            <Instagram size={18} />
            <span className="nav-link-ig-full">@{WHATSAPP_CONFIG.instagramHandle}</span>
            <span className="nav-link-ig-short">Instagram</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

