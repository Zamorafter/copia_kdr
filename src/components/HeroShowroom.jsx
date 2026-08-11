import React from 'react';
import { MessageCircle, Eye, Sparkles } from 'lucide-react';
import Shirt2DViewer from './Shirt2DViewer';
import { getWhatsAppLink } from '../config/whatsapp';

export default function HeroShowroom({ featuredShirt, onOpenModal }) {
  const wsLink = getWhatsAppLink(featuredShirt);

  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      
      <div className="container hero-grid">
        {/* Lado Izquierdo: Textos y Botón Principal a WhatsApp */}
        <div className="hero-text-content">
          <div className="hero-badge glass-pill">
            <Sparkles size={14} />
            <span>URBAN GLOW STREETWEAR</span>
          </div>

          <h1 className="hero-title">
            Camisas Exclusivas <br className="hero-br" />
            <span className="gradient-text-ig">Urban Glow</span>
          </h1>

          <p className="hero-subtitle">
            Catálogo oficial de nuestras prendas urbanas. Elige tu modelo favorito y consúltanos la disponibilidad y precio directamente por WhatsApp.
          </p>

          <div className="hero-actions">
            {/* Botón directo a WhatsApp */}
            <a
              href={wsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-whatsapp-lg hero-btn-ws"
            >
              <MessageCircle size={22} />
              <span>Consultar por WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenModal(featuredShirt)}
              className="btn-view-3d hero-btn-detail"
            >
              <Eye size={18} />
              <span>Ver Detalle</span>
            </button>
          </div>
        </div>

        {/* Lado Derecho: Muestra 2D de la Camisa Estrella */}
        <div className="canvas-3d-container">
          <Shirt2DViewer shirt={featuredShirt} />
        </div>
      </div>
    </section>
  );
}
