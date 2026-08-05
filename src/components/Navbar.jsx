import React from 'react';
import { Instagram, ShoppingBag } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo de la Marca */}
        <a href="#" className="logo-brand">
          <div className="logo-icon">
            <ShoppingBag size={22} color="#ffffff" />
          </div>
          <span className="logo-text">
            URBAN<span className="gradient-text-ig">3D</span>
          </span>
        </a>

        {/* Botón de Enlace a Instagram Oficial */}
        <div className="nav-links">
          <a
            href={`https://instagram.com/${WHATSAPP_CONFIG.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-ig"
            title="Ir a nuestro Instagram oficial"
          >
            <Instagram size={18} />
            <span>@{WHATSAPP_CONFIG.instagramHandle}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
