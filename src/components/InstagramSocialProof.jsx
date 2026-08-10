import React from 'react';
import { Instagram, Heart, MessageSquare } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { SHIRTS_DATA } from '../data/shirts';

export default function InstagramSocialProof() {
  const posts = SHIRTS_DATA.map((shirt, idx) => ({
    id: shirt.id,
    image: shirt.image,
    likes: (1.4 + idx * 0.8).toFixed(1) + 'k',
    comments: 80 + idx * 35
  }));

  return (
    <section className="social-proof-section">
      <div className="container">
        <div className="section-header">
          <div className="hero-badge glass-pill" style={{ display: 'inline-flex' }}>
            <Instagram size={14} />
            <span>INSTAGRAM OFFICIAL</span>
          </div>

          <h2 className="section-title">
            Síguenos en <span className="gradient-text-ig">@{WHATSAPP_CONFIG.instagramHandle}</span>
          </h2>
          <p className="section-subtitle">
            Conoce los últimos lanzamientos y la comunidad de Urban Glow.
          </p>
        </div>

        {/* Grid de Fotos de Instagram */}
        <div className="ig-grid">
          {posts.map(post => (
            <div key={post.id} className="ig-post-card">
              <img src={post.image} alt="Instagram post" loading="lazy" />
              <a
                href={WHATSAPP_CONFIG.instagramUrl}
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
            href={WHATSAPP_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-ig"
            style={{ display: 'inline-flex', padding: '0.8rem 2rem', fontSize: '1rem' }}
          >
            <Instagram size={20} />
            <span>Ver Instagram @{WHATSAPP_CONFIG.instagramHandle}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
