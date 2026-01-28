'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

  return (
    <div className="font-sans bg-[#111] text-[#f5f5f5] min-h-screen">
      {/* Header */}
      <header className="bg-black py-5 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center border-b-2 border-yellow-700">
        <div className="font-['var(--font-playfair)'] text-2xl md:text-3xl text-yellow-500">BLASS BARBERÍA</div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-center gap-5 md:gap-8">
            <li><Link href="/turnos" className="font-bold hover:text-yellow-500 transition">Reservar</Link></li>
            <li><Link href="/horarios" className="font-bold hover:text-yellow-500 transition">Horarios</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero con foto del local */}
      <section 
        className="relative h-[60vh] md:h-[70vh] w-full"
        style={{ backgroundImage: 'url(/fotos/local.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10 px-4">
          <h1 className="font-['var(--font-playfair)'] text-4xl md:text-6xl text-white mb-2">BLASS BARBERÍA</h1>
          <p className="text-xl text-yellow-400 font-light uppercase tracking-widest">SINCE 2018</p>
        </div>
      </section>

      {/* Presentación de Iván */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="font-['var(--font-playfair)'] text-3xl text-yellow-500 text-center mb-10">👨‍🦱 Conocé a Iván</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-yellow-700/30 shadow-xl">
            <video 
              src="/videos/ivan.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-gray-300 text-lg leading-relaxed font-['var(--font-geist-sans)']">
            Barbero con más de 5 años de experiencia, especialista en cortes modernos, alisados y coloración. 
            Cada cliente recibe atención personalizada en un espacio limpio, profesional y relajado.
          </div>
        </div>
      </section>

      {/* Galería de cortes */}
      <section className="py-16 px-6 bg-[#0a0a0a]">
        <h2 className="font-['var(--font-playfair)'] text-3xl text-yellow-500 text-center mb-10">📸 Trabajos destacados</h2>
        <div className="flex flex-wrap justify-center gap-4">
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
              className="cursor-pointer w-full sm:w-[48%] md:w-[23%] aspect-square rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-yellow-700 transition"
            >
              <img 
                src={src} 
                alt={`Corte ${i + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="font-['var(--font-playfair)'] text-3xl text-yellow-500 text-center mb-10">✂️ Servicios</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            'Adulto', 'Niños', 'Jubilados',
            'Alisados', 'Claritos', 'Corte', 'Corte + Barba'
          ].map((servicio, i) => (
            <div 
              key={i}
              className="bg-[#222] p-6 rounded-lg min-w-[200px] flex-1 border border-yellow-700 hover:scale-103 transition-transform shadow-md"
            >
              <h3 className="font-['var(--font-playfair)'] text-yellow-500 text-xl">{servicio}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Ubicación y horarios */}
<section className="py-16 px-6 bg-[#0a0a0a]">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      {/* Mapa */}
      <div>
        <h2 className="font-['var(--font-playfair)'] text-3xl text-yellow-500 mb-6">📍 Ubicación</h2>
        <div className="rounded-xl overflow-hidden h-64 shadow-xl border border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.823435326449!2d-58.38355942430445!3d-34.79324407275486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb5e5c1d1a0d%3A0x1e5e4d7a8e3d1b0a!2sAv.%20San%20Mart%C3%ADn%201709%2C%20Adrogu%C3%A9%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713000000000!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de BLASS BARBERÍA"
            className="w-full h-full filter grayscale"
          ></iframe>
        </div>
        <div className="space-y-3 mt-4 text-gray-300">
          <p className="flex items-start">
            <span className="text-xl mr-2">🏠</span>
            <span>Av. San Martín 1709, Adrogué</span>
          </p>
          <p className="flex items-start">
            <span className="text-xl mr-2">📞</span>
            <span>(11) 5126-7846</span>
          </p>
        </div>
      </div>
      
      {/* Horarios */}
      <div>
        <h2 className="font-['var(--font-playfair)'] text-3xl text-yellow-500 mb-6">🕒 Horarios</h2>
        <div className="w-full bg-[#222] rounded-lg overflow-hidden border border-yellow-700">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-yellow-700/30">
                <td className="p-4 font-medium">Martes a Viernes</td>
                <td className="p-4 text-yellow-400">9:00 - 13:00 y 15:00 - 20:00</td>
              </tr>
              <tr className="border-b border-yellow-700/30">
                <td className="p-4 font-medium">Sábados</td>
                <td className="p-4 text-yellow-400">9:00 - 20:00</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Domingos y Lunes</td>
                <td className="p-4 text-red-400">Cerrado</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/turnos"
            className="inline-block bg-yellow-700 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-600 transition font-['var(--font-geist-sans)']"
          >
            📅 Reservar turno ahora
          </Link>
          <p className="mt-4 font-['var(--font-geist-sans)']">
            O contactanos por{' '}
            <a 
              href="https://wa.me/5491151267846" 
              className="text-yellow-500 hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Modal de imagen ampliada */}
      {imagenAmpliada && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setImagenAmpliada(null)}
        >
          <img 
            src={imagenAmpliada} 
            alt="Ampliada"
            className="max-w-full max-h-full object-contain border-2 border-yellow-700"
          />
          <button 
            className="absolute top-6 right-6 text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setImagenAmpliada(null);
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-center py-6 border-t border-gray-800 text-gray-400 font-['var(--font-geist-sans)']">
        <p>&copy; {new Date().getFullYear()} BLASS BARBERÍA. Todos los derechos reservados.</p>
        <p className="mt-1">SINCE 2018</p>
      </footer>
    </div>
  );
}