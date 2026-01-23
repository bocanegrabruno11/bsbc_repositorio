import React from 'react';
import { motion } from 'framer-motion';

function ProyectoCard({ proyecto }) {
  
  // Función para formatear fechas bonito
  const formatFechas = (inicio, fin) => {
    if (!inicio) return '';
    const dateOptions = { month: 'short', year: 'numeric' };
    const fInicio = new Date(inicio).toLocaleDateString('es-ES', dateOptions);
    const fFin = fin ? new Date(fin).toLocaleDateString('es-ES', dateOptions) : 'Presente';
    return `${fInicio} - ${fFin}`.replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      // Quitamos el padding del contenedor principal para que la imagen toque los bordes
      style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} 
    >
      {/* 1. ZONA DE IMAGEN (El truco está aquí) */}
      <div style={{ 
        width: '100%', 
        height: '200px', // ALTO FIJO: Esto asegura que todas las tarjetas sean iguales arriba
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#f1f5f9', // Color de fondo por si la imagen tarda en cargar
        position: 'relative'
      }}>
        {proyecto.imagen_url ? (
          <img 
            src={proyecto.imagen_url} 
            alt={proyecto.titulo} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',   // <--- MAGIA: Evita que se deforme (funciona para vert/horiz)
              objectPosition: 'center', // Centra la imagen
              display: 'block' 
            }}
            onError={(e) => {
              // Si la imagen falla, ocultamos la etiqueta img y mostramos el color de fondo
              e.target.style.display = 'none'; 
            }}
          />
        ) : (
          // Placeholder si no hay imagen en base de datos
          <div style={{ 
            width: '100%', height: '100%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: '3rem'
          }}>
            📷
          </div>
        )}
      </div>

      {/* 2. ZONA DE CONTENIDO */}
      <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Encabezado: Fecha y Título */}
        <div style={{ marginBottom: '15px' }}>
          {(proyecto.fecha_inicio) && (
            <small style={{ 
              display: 'block', marginBottom: '5px',
              color: '#64748b', fontWeight: '600', 
              textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' 
            }}>
              {formatFechas(proyecto.fecha_inicio, proyecto.fecha_fin)}
            </small>
          )}
          
          <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>
            {proyecto.titulo}
          </h3>
        </div>

        {/* Descripción */}
        <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6', color: '#475569', flex: 1 }}>
          {proyecto.descripcion}
        </p>

        {/* Parte inferior: Tags y Botones */}
        <div style={{ marginTop: 'auto' }}>
          
          {/* Tags de Tecnologías */}
          <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {proyecto.tecnologias && proyecto.tecnologias.split(',').map((tech, index) => (
               <span key={index} className="tech-tag" style={{ 
                  background: '#f8fafc', color: '#334155', 
                  padding: '4px 10px', borderRadius: '6px', 
                  border: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: '600'
               }}>
                  {tech.trim()}
               </span>
             ))}
          </div>
          
        
        </div>
      </div>
    </motion.div>
  );
}

export default ProyectoCard;