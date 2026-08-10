import React, { useState } from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../config/whatsapp';

export default function Catalog({ shirts, onOpenModal }) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Streetwear', 'Racing'];

  const filteredShirts = selectedCategory === 'Todas'
    ? shirts
    : shirts.filter(s => s.category === selectedCategory);

  return (
    <section className="catalog-section" id="catalogo">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Colección <span className="gradient-text-ig">Urban Glow</span>
          </h2>
          <p className="section-subtitle">
            Selecciona la camisa de tu preferencia para ver su detalle o hacer tu consulta directa por WhatsApp.
          </p>

          {/* Filtros de Categorías */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="glass-pill"
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                  background: selectedCategory === cat ? 'var(--accent-ig-solid)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid ' + (selectedCategory === cat ? 'var(--accent-ig-solid)' : 'rgba(255,255,255,0.1)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="products-grid">
          {filteredShirts.map(shirt => {
            const wsUrl = getWhatsAppLink(shirt);

            return (
              <div key={shirt.id} className="glass-panel product-card">
                {/* Imagen del Producto */}
                <div className="product-image-wrap">
                  <img src={shirt.image} alt={shirt.name} loading="lazy" />
                  <span className="product-badge-tag">{shirt.tag}</span>
                </div>

                {/* Detalles de la Camisa */}
                <div className="product-details">
                  <div>
                    <h3 className="product-name">{shirt.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {shirt.description}
                    </p>
                  </div>

                  {/* Acciones: Ver Detalle y WhatsApp */}
                  <div className="product-actions-row">
                    <button
                      onClick={() => onOpenModal(shirt)}
                      className="btn-view-3d"
                      title="Ver detalle del modelo"
                    >
                      <Eye size={16} />
                      <span>Detalle</span>
                    </button>

                    <a
                      href={wsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp btn-card-ws"
                    >
                      <MessageCircle size={18} />
                      <span>Comprar</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
