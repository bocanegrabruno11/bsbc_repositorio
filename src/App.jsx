import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from './supabaseClient'
import ProyectoCard from './ProyectoCard'
import ContactoModal from './ContactoModal'
import './App.css'

function App() {
  const [perfil, setPerfil] = useState(null)
  const [proyectos, setProyectos] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  useEffect(() => {
    async function fetchDatos() {
      // 1. Cargar Perfil
      const { data: dataPerfil } = await supabase.from('perfil').select('*').single()
      setPerfil(dataPerfil)
      
      // 2. Cargar Proyectos
      const { data: dataProyectos } = await supabase.from('proyectos').select('*')
      setProyectos(dataProyectos || [])
    }
    fetchDatos()
  }, [])

  return (
    <div>
      {/* NAVBAR */}
      <nav>
        <span className="nav-logo">
          {perfil ? perfil.nombre : 'Portafolio'}
        </span>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#sobre-mi">Sobre mí</a></li> {/* NUEVA OPCIÓN */}
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-container">
        
        {/* 1. SECCIÓN INICIO (HERO): Foto y Título Principal */}
        <motion.section 
          id="inicio" 
          style={{ textAlign: 'center', padding: '60px 0 20px 0' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {perfil && (
            <>
              {perfil.foto_url && (
                <img className="profile-img" src={perfil.foto_url} alt="Perfil" />
              )}
              <h1 style={{ marginTop: '20px' }}>Hola, soy {perfil.nombres}</h1>
              <h2 style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 'normal' }}>
                {perfil.profesion}
              </h2>
              
              <div style={{ marginTop: '30px' }}>
                <a href="#proyectos" className="btn">Ver Mis Proyectos</a>
                <a href="#sobre-mi" className="btn btn-secondary">Leer biografía</a>
              </div>
            </>
          )}
        </motion.section>

        {/* 2. NUEVA SECCIÓN: SOBRE MÍ */}
        <motion.section 
          id="sobre-mi"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto 80px auto' }} // Centrado y con margen
        >
            <div style={{ 
              background: '#fff', 
              padding: '40px', 
              borderRadius: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ color: 'var(--accent)', fontSize: '1.8rem', marginBottom: '20px' }}>
                Sobre mí
              </h2>
              {perfil ? (
                <p style={{ fontSize: '1.15rem', color: '#334155', lineHeight: '1.8' }}>
                  {perfil.bio}
                </p>
              ) : (
                <p>Cargando información...</p>
              )}
            </div>
        </motion.section>

        {/* 3. SECCIÓN PROYECTOS */}
        <motion.section 
          id="proyectos"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ borderLeft: '5px solid var(--accent)', paddingLeft: '15px' }}>
            Mis Proyectos Recientes
          </h2>
          
          <div className="grid-proyectos">
            {proyectos.map((proyecto) => (
              <ProyectoCard key={proyecto.id} proyecto={proyecto} />
            ))}
          </div>

          {proyectos.length === 0 && (
            <div className="text-center" style={{ marginTop: '50px' }}>
              <p>Cargando proyectos... o no hay datos aún.</p>
            </div>
          )}
        </motion.section>

        {/* 4. SECCIÓN CONTACTO */}
        <motion.section 
          id="contacto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            background: 'linear-gradient(to right, #eff6ff, #fff)', 
            padding: '50px', 
            borderRadius: '20px', 
            textAlign: 'center',
            border: '1px solid #dbeafe'
          }}>
            <h2>¿Listo para trabajar juntos?</h2>
            <p style={{ marginBottom: '30px' }}>
              Actualmente estoy disponible para nuevos retos y colaboraciones.
            </p>
            <button 
              onClick={() => setModalAbierto(true)} 
              className="btn" 
              style={{ fontSize: '1.1rem', padding: '15px 30px' }}
            >
              Envíame un mensaje
            </button>
          </div>
        </motion.section>

      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2026 {perfil ? perfil.nombre : 'Mi Portafolio'}. Hecho con React, Supabase & Vercel.</p>
      </footer>
      <ContactoModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
      />
    </div>
  )
}

export default App