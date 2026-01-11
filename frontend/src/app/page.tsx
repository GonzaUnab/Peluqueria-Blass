import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero con botón principal — ahora en blanco/negro */}
      <div className="relative bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img 
                src="/logo.jpg" 
                alt="Peluquería Blass" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Peluquería Blass
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              Donde cada corte es una obra de arte y cada cliente se siente especial.
            </p>
            <div className="mt-10">
              <Link 
                href="/turnos"
                className="inline-block bg-white text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition shadow-md"
              >
                📅 Reservar turno ahora
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Fotos del lugar — en blanco/negro */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Nuestro espacio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/fotos/salon.jpg', alt: 'Recepción' },
              { src: '/fotos/barberia.jpg', alt: 'Zona de corte' },
              { src: '/fotos/detalles.jpg', alt: 'Antes y después' }
            ].map((foto, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden border-4 border-black">
                <img 
                  src={foto.src} 
                  alt={foto.alt} 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Servicios — sin colores, solo tipografía fuerte */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black">Servicios destacados</h2>
            <p className="mt-4 text-xl text-gray-700">Calidad y dedicación en cada trabajo</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Corte de Cabello', desc: 'Estilo moderno, clásico o personalizado según tu rostro y personalidad', icon: '✂️' },
              { title: 'Barba y Bigote', desc: 'Diseño, recorte profesional y cuidado con productos premium', icon: '🧔' },
              { title: 'Tintes y Mechas', desc: 'Coloración profesional con productos sin amoníaco', icon: '🎨' }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-300 hover:shadow-sm transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipo — fondo blanco, texto negro */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black">Nuestro equipo</h2>
            <p className="mt-4 text-xl text-gray-700">Profesionales con años de experiencia</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Ivan Lobos', role: 'Barbero', exp: '3 años de experiencia', spec: 'Especialista en cortes modernos y coloracion' },
              { name: 'Mati Broda', role: 'Barbero', exp: '2 años de experiencia', spec: 'Coloración, peinados y tratamientos capilares' }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-300">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-6xl">🧑‍🦱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black">{p.name}</h3>
                  <p className="text-gray-800 font-medium">{p.role}</p>
                  <p className="mt-2 text-gray-700">{p.exp}</p>
                  <p className="mt-2 italic text-gray-800">"{p.spec}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reseñas — fondo blanco, bordes sutiles */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black">Lo que dicen nuestros clientes</h2>
            <p className="mt-4 text-xl text-gray-700">Experiencias reales</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Carlos M.', text: '¡Increíble atención! Ivan me hizo un corte que me duró 3 semanas impecable.', stars: 5 },
              { name: 'Gonzalo D.', text: 'Ivan es un artista con las tijeras. Siempre salgo feliz y con estilo.', stars: 5 },
              { name: 'Martín P.', text: 'Puntualidad, limpieza y profesionalismo. El mejor lugar para cuidar tu imagen.', stars: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-300">
                <div className="flex text-black mb-3">
                  {'★'.repeat(review.stars)}
                </div>
                <p className="text-gray-800 italic mb-4">"{review.text}"</p>
                <p className="font-bold text-black">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔑 SECCIÓN CLAVE: Horarios, mapa, datos — TODO EN BLANCO/NEGRO */}
      <div className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">📍 Ubicación</h2>
              
              {/* Mapa en blanco/negro */}
              <div className="rounded-xl overflow-hidden h-64 shadow-lg mb-6 border border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.823435326449!2d-58.38355942430445!3d-34.79324407275486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb5e5c1d1a0d%3A0x1e5e4d7a8e3d1b0a!2sAv.%20San%20Mart%C3%ADn%201709%2C%20Adrogu%C3%A9%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713000000000!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de BLASS BARBERÍA"
                  className="w-full h-full grayscale"
                ></iframe>
              </div>
              
              <div className="space-y-4">
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span>Av. San Martín 1709, Adrogué</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📞</span>
                  <span>(11) 5126-7846</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📱</span>
                  <span>
                    <a 
                      href="https://wa.me/5491151267846?text=Hola,%20quiero%20reservar%20un%20turno" 
                      className="text-white hover:underline"
                    >
                      Reservar por WhatsApp
                    </a>
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📸</span>
                  <span>@peluqueriaBlass</span>
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">🕒 Horarios</h2>
              <div className="space-y-3">
                {[
                  { day: 'Martes a Viernes', hours: '9:00 - 13:00 y 15:00 - 20:00' },
                  { day: 'Sábados', hours: '9:00 - 20:00' },
                  { day: 'Domingos y Lunes', hours: 'Cerrado' }
                ].map((h, i) => (
                  <div key={i} className="flex justify-between border-b border-gray-600 pb-2">
                    <span className="font-medium">{h.day}</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-white p-4 rounded-lg text-center">
                <p className="font-bold text-black">¡Reservá tu turno y evitá esperas!</p>
                <Link 
                  href="/turnos"
                  className="mt-2 inline-block bg-black text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800 transition"
                >
                  📅 Reservar ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp flotante — en negro */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5491151267846"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition transform hover:scale-105"
          aria-label="WhatsApp"
        >
          <span className="text-3xl">💬</span>
        </a>
      </div>

      {/* Footer — negro con texto blanco */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Peluquería Blass. Todos los derechos reservados.</p>
          <p className="mt-2">¡Gracias por confiar en nosotros!</p>
        </div>
      </footer>
    </div>
  );
}