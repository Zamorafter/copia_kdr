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
            <div className="modal-badge-row">
              <span className="product-badge-tag">{shirt.tag}</span>
              <span className="modal-category-name">
                {shirt.category}
              </span>
            </div>

            <h2 className="modal-title">
              {shirt.name}
            </h2>

            <p className="modal-description">
              {shirt.description}
            </p>

            {/* Botón WhatsApp para el Modelo */}
            <a
              href={wsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-whatsapp-lg modal-buy-btn"
            >
              <MessageCircle size={22} />
              <span>Comprar por WhatsApp</span>
            </a>
            
            <p className="modal-note">
              💬 Consulta de inmediato precio y disponibilidad por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
