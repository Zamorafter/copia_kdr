import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Shirt2DViewer({ shirt }) {
  if (!shirt) return null;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at center, rgba(32, 38, 58, 0.7) 0%, rgba(13, 14, 21, 0.95) 100%)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem'
    }}>
      {/* Badge flotante de la colección */}
      <div className="glass-pill" style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.25rem',
        padding: '0.4rem 1rem',
        fontSize: '0.8rem',
        fontWeight: '800',
        color: '#e1306c',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        zIndex: 5
      }}>
        <Sparkles size={14} />
        <span>{shirt.tag || 'EXCLUSIVA'}</span>
      </div>

      {/* Imagen 2D HD con sombras estilizadas */}
      <img
        src={shirt.image}
        alt={shirt.name}
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
          borderRadius: 'var(--radius-md)',
          filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.75))',
          transition: 'transform 0.4s ease'
        }}
      />
    </div>
  );
}
