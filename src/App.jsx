import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroShowroom from './components/HeroShowroom';
import Catalog from './components/Catalog';
import ProductModal3D from './components/ProductModal3D';
import InstagramSocialProof from './components/InstagramSocialProof';
import { SHIRTS_DATA } from './data/shirts';
import { WHATSAPP_CONFIG, getWhatsAppLink } from './config/whatsapp';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [activeModalShirt, setActiveModalShirt] = useState(null);

  // La camisa destacada en el Hero (por defecto la primera)
  const featuredShirt = SHIRTS_DATA[0];

  const handleOpenModal = (shirt) => {
    setActiveModalShirt(shirt);
  };

  const handleCloseModal = () => {
    setActiveModalShirt(null);
  };

  const generalWhatsAppUrl = getWhatsAppLink();

  return (
    <div className="app-root">
      {/* Navegación */}
      <Navbar />

      {/* Hero 3D Showroom */}
      <HeroShowroom
        featuredShirt={featuredShirt}
        onOpenModal={handleOpenModal}
      />

      {/* Catálogo de Camisas */}
      <Catalog
        shirts={SHIRTS_DATA}
        onOpenModal={handleOpenModal}
      />

      {/* Prueba Social de Instagram */}
      <InstagramSocialProof />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} STREETWEAR 3D. Todos los derechos reservados.</p>
          <p style={{ marginTop: '0.5rem' }}>
            Diseñado para ventas por{' '}
            <a
              href={WHATSAPP_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{' '}
            y WhatsApp (+{WHATSAPP_CONFIG.phoneNumber})
          </p>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp para Móviles */}
      <a
        href={generalWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={26} />
        <span className="floating-whatsapp-text">Consultar</span>
      </a>

      {/* Modal 3D al hacer clic en ver en 3D */}
      <ProductModal3D
        shirt={activeModalShirt}
        onClose={handleCloseModal}
      />
    </div>
  );
}

