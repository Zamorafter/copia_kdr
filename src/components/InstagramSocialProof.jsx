import React from 'react';
import { Instagram, Heart, MessageSquare } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

export default function InstagramSocialProof() {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      likes: '1.2k',
      comments: '84'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      likes: '2.4k',
      comments: '130'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
      likes: '980',
      comments: '62'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      likes: '3.1k',
      comments: '215'
    }
  ];

  return (
    <section className="social-proof-section">
      <div className="container">
        <div className="section-header">
          <div className="hero-badge glass-pill" style={{ display: 'inline-flex' }}>
            <Instagram size={14} />
            <span>INSTAGRAM COMMUNITY</span>
          </div>

          <h2 className="section-title">
            Síguenos en <span className="gradient-text-ig">@{WHATSAPP_CONFIG.instagramHandle}</span>
          </h2>
          <p className="section-subtitle">
            Mira cómo lucen nuestros clientes con sus camisas y entérate de los próximos drops exclusivos.
          </p>
        </div>

        {/* Grid de Fotos de Instagram */}
        <div className="ig-grid">
          {posts.map(post => (
            <div key={post.id} className="ig-post-card">
              <img src={post.image} alt="Instagram post" loading="lazy" />
              <a
                href={`https://instagram.com/${WHATSAPP_CONFIG.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-post-overlay"
              >
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Heart size={18} fill="#fff" /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MessageSquare size={18} fill="#fff" /> {post.comments}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href={`https://instagram.com/${WHATSAPP_CONFIG.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-ig"
            style={{ display: 'inline-flex', padding: '0.8rem 2rem', fontSize: '1rem' }}
          >
            <Instagram size={20} />
            <span>Ver más en Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
