import React from 'react';
import { motion } from 'framer-motion'; // <--- 1. IMPORTAR

function ProyectoCard({ proyecto }) {
  return (
    <motion.div 
      className="card"
      // 2. CONFIGURAR LA ANIMACIÓN
      initial={{ opacity: 0, y: 50 }}    // Empieza invisible y 50px abajo
      whileInView={{ opacity: 1, y: 0 }} // Cuando se ve: opacidad 1 y sube a posición 0
      transition={{ duration: 0.5 }}     // Tarda 0.5 segundos en hacerlo
      viewport={{ once: true }}          // Solo lo hace la primera vez (no cada vez que subes y bajas)
    >
      <div>
        <h3 style={{ marginBottom: '10px', color: '#1e293b' }}>{proyecto.titulo}</h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>{proyecto.descripcion}</p>
        <div style={{ marginBottom: '20px' }}>
            <span className="tech-tag" style={{ 
                background: '#f1f5f9', color: '#475569', 
                padding: '4px 8px', borderRadius: '4px', 
                fontSize: '0.8rem', fontWeight: 'bold' 
            }}>
                {proyecto.tecnologias}
            </span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <a href={proyecto.repo_url} target="_blank" rel="noreferrer" className="btn" style={{ flex: 1, fontSize: '0.9rem' }}>
          GitHub
        </a>
        {proyecto.demo_url && (
          <a href={proyecto.demo_url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, fontSize: '0.9rem' }}>
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default ProyectoCard;