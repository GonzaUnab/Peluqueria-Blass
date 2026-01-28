'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <div className="relative bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">BLASS BARBERÍA</h1>
            <p className="mt-2 text-lg text-yellow-300 font-light uppercase tracking-wider">
              SINCE 2018
            </p>
          </div>
        </div>
      </div>

      {/* Foto del lugar */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <img 
          src="/fotos/local.jpg" 
          alt="Peluquería Blass - Adrogué"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white max-w-lg">
          <h2 className="text-2xl font-bold">📍 Nuestro espacio en Adrogué</h2>
          <p className="mt-1">Donde el estilo clásico se encuentra con la atención personalizada.</p>
        </div>
      </div>

      {/* Presentación de Iván */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">👨‍🦱 Conocé a Iván</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Barbero con más de 5 años de experiencia, especialista en cortes modernos y atención al detalle.
          </p>
          
          <div className="relative aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden border-2 border-yellow-700/30 shadow-lg">
            <video 
              src="/videos/ivan.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-12">🧴 Productos profesionales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Gel', 'Polvo texturizador', 'Ceras', 'Pomada'].map((prod, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl text-yellow-800">🧴</span>
                </div>
                <p className="font-medium text-yellow-800">{prod}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-12">✂️ Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              'Adulto', 'Niños', 'Jubilados',
              'Alisados', 'Claritos', 'Corte', 'Corte + Barba'
            ].map((servicio, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-300 text-center">
                <p className="font-medium text-yellow-800">{servicio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Galería de cortes */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-12">📸 Trabajos destacados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/cortes/corte1.jpg',
              '/cortes/corte2.jpg',
              '/cortes/corte3.jpg',
              '/cortes/corte4.jpg',
              '/cortes/corte5.jpg',
              '/cortes/corte6.jpg',
              '/cortes/corte7.jpg',
              '/cortes/corte8.jpg'
            ].map((src, i) => (
              <div 
                key={i}
                onClick={() => setImagenAmpliada(src)}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer border border-gray-200 hover:border-yellow-700 transition"
              >
                <img 
                  src={src} 
                  alt={`Corte ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      {imagenAmpliada && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setImagenAmpliada(null)}
        >
          <img 
            src={imagenAmpliada} 
            alt="Ampliada"
            className="max-w-full max-h-full object-contain border-2 border-yellow-700"
          />
          <button 
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setImagenAmpliada(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Horarios y ubicación */}
      <div className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">📍 Ubicación</h2>
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
                      className="text-yellow-300 hover:underline"
                    >
                      Reservar por WhatsApp
                    </a>
                  </span>
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
                  className="mt-2 inline-block bg-yellow-700 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-800 transition"
                >
                  📅 Reservar ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5491151267846"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-yellow-300 p-4 rounded-full shadow-lg hover:text-yellow-200 transition transform hover:scale-105"
          aria-label="WhatsApp"
        >
          <span className="text-3xl">💬</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} BLASS BARBERÍA. Todos los derechos reservados.</p>
          <p className="mt-2 text-yellow-300">SINCE 2018</p>
        </div>
      </footer>
    </div>
  );
}