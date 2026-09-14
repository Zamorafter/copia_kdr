import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroShowroom from './components/HeroShowroom';
import Catalog from './components/Catalog';
import ProductModal3D from './components/ProductModal3D';
import InstagramSocialProof from './components/InstagramSocialProof';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminPanel from './components/admin/AdminPanel';
import { AuthProvider, useAuth } from './context/AuthContext';
import { fetchShirts } from './services/shirtService';
import { SHIRTS_DATA } from './data/shirts';
import { WHATSAPP_CONFIG, getWhatsAppLink } from './config/whatsapp';
import { MessageCircle } from 'lucide-react';

function StoreContent() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [shirts, setShirts] = useState(SHIRTS_DATA);
  const [loading, setLoading] = useState(true);
  const [activeModalShirt, setActiveModalShirt] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Cargar camisas desde Supabase (o fallback local)
  const loadShirts = async () => {
    setLoading(true);
    try {
      const res = await fetchShirts();
      if (res.data && res.data.length > 0) {
        setShirts(res.data);
      }
    } catch (e) {
      console.warn('Error al cargar camisas:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShirts();
  }, []);

  // Detector de enlace directo: si la URL contiene #admin o ?admin o /admin
  const checkAdminRoute = () => {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const path = window.location.pathname.toLowerCase();

    if (hash === '#admin' || search.includes('admin') || path.endsWith('/admin')) {
      if (isAuthenticated) {
        setIsAdminPanelOpen(true);
        setIsAdminLoginOpen(false);
      } else {
        setIsAdminLoginOpen(true);
        setIsAdminPanelOpen(false);
      }
    }
  };

  useEffect(() => {
    if (!authLoading) {
      checkAdminRoute();
    }

    const handleHashChange = () => {
      checkAdminRoute();
    };

    // Atajo de teclado secreto para abrir el admin: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.hash = 'admin';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthenticated, authLoading]);

  // Cerrar modales y limpiar hash de la URL
  const handleCloseAdmin = () => {
    setIsAdminLoginOpen(false);
    setIsAdminPanelOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleOpenModal = (shirt) => {
    setActiveModalShirt(shirt);
  };

  const handleCloseModal = () => {
    setActiveModalShirt(null);
  };

  const featuredShirt = shirts[0] || SHIRTS_DATA[0];
  const generalWhatsAppUrl = getWhatsAppLink();

  return (
    <div className="app-root">
      {/* Barra de navegación pública (sin botones de admin) */}
      <Navbar />

      {/* Hero 3D Showroom */}
      <HeroShowroom
        featuredShirt={featuredShirt}
        onOpenModal={handleOpenModal}
      />

      {/* Catálogo de Camisas Dinámico */}
      <Catalog
        shirts={shirts}
        onOpenModal={handleOpenModal}
      />

      {/* Prueba Social de Instagram */}
      <InstagramSocialProof />

      {/* Footer Público */}
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

      {/* Modal 3D al hacer clic en ver en 3D / Detalle */}
      <ProductModal3D
        shirt={activeModalShirt}
        onClose={handleCloseModal}
      />

      {/* Modal de Login Admin (Acceso por link directo #admin) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={handleCloseAdmin}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Panel Completo de Gestión de Productos */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={handleCloseAdmin}
        shirts={shirts}
        onRefreshShirts={loadShirts}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreContent />
    </AuthProvider>
  );
}
