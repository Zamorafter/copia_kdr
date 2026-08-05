import React from 'react';
import { MessageCircle, Rotate3d, Sparkles } from 'lucide-react';
import Shirt3DViewer from './Shirt3DViewer';
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
            <span>COLECCIÓN EXCLUSIVA 3D</span>
          </div>

          <h1 className="hero-title">
            Camisas que <br />
            <span className="gradient-text-ig">destacan en 3D</span>
          </h1>

          <p className="hero-subtitle">
            Explora nuestros modelos en vista tridimensional 360°. Encuentra tu estilo urbano ideal y consúltanos directo por WhatsApp.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Botón directo a WhatsApp con mensaje exacto */}
            <a
              href={wsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-whatsapp-lg"
            >
              <MessageCircle size={22} />
              <span>Consultar en WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenModal(featuredShirt)}
              className="btn-view-3d"
              style={{ padding: '1rem 1.5rem' }}
            >
              <Rotate3d size={18} />
              <span>Ver Modelo 3D</span>
            </button>
          </div>
        </div>

        {/* Lado Derecho: Canvas 3D de la Camisa Estrella */}
        <div className="canvas-3d-container">
          <Shirt3DViewer shirt={featuredShirt} autoRotate={true} />
          
          <div className="instructions-3d-badge glass-pill">
            <Rotate3d size={16} color="#e1306c" />
            <span>Arrastra para rotar 360° en 3D</span>
          </div>
        </div>
      </div>
    </section>
  );
}
