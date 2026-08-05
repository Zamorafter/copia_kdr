import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroShowroom from './components/HeroShowroom';
import Catalog from './components/Catalog';
import ProductModal3D from './components/ProductModal3D';
import InstagramSocialProof from './components/InstagramSocialProof';
import { SHIRTS_DATA } from './data/shirts';
import { WHATSAPP_CONFIG } from './config/whatsapp';

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
              href={`https://instagram.com/${WHATSAPP_CONFIG.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{' '}
            y WhatsApp (+{WHATSAPP_CONFIG.phoneNumber})
          </p>
        </div>
      </footer>

      {/* Modal 3D al hacer clic en ver en 3D */}
      <ProductModal3D
        shirt={activeModalShirt}
        onClose={handleCloseModal}
      />
    </div>
  );
}
