import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import Shirt2DViewer from './Shirt2DViewer';
import { getWhatsAppLink } from '../config/whatsapp';

export default function ProductModal3D({ shirt, onClose }) {
  if (!shirt) return null;

  const wsUrl = getWhatsAppLink(shirt);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Botón Cerrar */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Lado Imagen 2D */}
          <div className="modal-3d-box">
            <Shirt2DViewer shirt={shirt} />
          </div>

          {/* Lado Información y Botón de WhatsApp */}
          <div className="modal-info-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="product-badge-tag">{shirt.tag}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-ig-solid)', fontWeight: '700' }}>
                {shirt.category}
              </span>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: '1.1' }}>
              {shirt.name}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {shirt.description}
            </p>

            {/* Botón WhatsApp para el Modelo */}
            <a
              href={wsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-whatsapp-lg"
              style={{ width: '100%' }}
            >
              <MessageCircle size={22} />
              <span>Comprar por WhatsApp</span>
            </a>
            
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.85rem' }}>
              💬 Consulta de inmediato precio y disponibilidad por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
