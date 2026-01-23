// src/ContactoModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ContactoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // AQUÍ OCURRE LA MAGIA
    const miCorreo = "bruno.sbc0211@gmail.com";
    const asuntoEncoded = encodeURIComponent(`Portafolio Contacto: ${formData.asunto}`);
    const cuerpoEncoded = encodeURIComponent(
      `Hola Bruno,\n\nSoy ${formData.nombre}.\n\n${formData.mensaje}`
    );

    // Construimos el link y lo abrimos
    window.open(`mailto:${miCorreo}?subject=${asuntoEncoded}&body=${cuerpoEncoded}`, '_blank');
    
    // Cerramos el modal y limpiamos
    onClose();
    setFormData({ nombre: '', asunto: '', mensaje: '' });
  };

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Fondo Oscuro (Overlay) */}
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Cerrar si clickean afuera
      >
        {/* La Caja del Modal */}
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Evitar que se cierre si clickean adentro
        >
          <button className="close-btn" onClick={onClose}>&times;</button>
          
          <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Nuevo Mensaje</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tu Nombre:</label>
              <input 
                type="text" 
                name="nombre" 
                required 
                value={formData.nombre} 
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div className="form-group">
              <label>Asunto:</label>
              <input 
                type="text" 
                name="asunto" 
                required 
                value={formData.asunto} 
                onChange={handleChange}
                placeholder="Ej. Propuesta de proyecto"
              />
            </div>

            <div className="form-group">
              <label>Mensaje:</label>
              <textarea 
                name="mensaje" 
                required 
                value={formData.mensaje} 
                onChange={handleChange}
                placeholder="Escribe aquí tu mensaje..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>
              Continuar
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ContactoModal;