import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero con botón principal */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img 
              src="/logo.jpg" 
              alt="Peluquería Blass" 
              className="w-full h-full object-cover" 
              />
  <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
    Peluquería Blass
  </h1>
</div>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto">
              Donde cada corte es una obra de arte y cada cliente se siente especial.
            </p>
            <div className="mt-10">
              <Link 
                href="/turnos"
                className="inline-block bg-white text-blue-800 font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-50 transition shadow-lg"
              >
                📅 Reservar turno ahora
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Fotos de la peluquería */}
<div className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestro espacio</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { src: '/foto1.jpg', alt: 'Recepción' },
        { src: '/foto2.jpg', alt: 'Zona de corte' },
        { src: '/foto3.jpg', alt: 'Antes y después' }
      ].map((foto, i) => (
        <div key={i} className="aspect-video rounded-xl overflow-hidden border-4 border-white shadow-lg">
          <div className="w-full h-full bg-gray-200">
            {/* ✅ Para desarrollo local: usa placeholder */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span className="text-4xl">🖼️ {foto.alt}</span>
            </div>
            {/* ✅ Cuando subas fotos reales, reemplazá por: */}
            {/* <Image src={foto.src} alt={foto.alt} width={400} height={300} className="w-full h-full object-cover" /> */}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      {/* Servicios */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Servicios destacados</h2>
            <p className="mt-4 text-xl text-gray-600">Calidad y dedicación en cada trabajo</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Corte de Cabello',
                desc: 'Estilo moderno, clásico o personalizado según tu rostro y personalidad',
                icon: '✂️'
              },
              {
                title: 'Barba y Bigote',
                desc: 'Diseño, recorte profesional y cuidado con productos premium',
                icon: '🧔'
              },
              {
                title: 'Tintes y Mechas',
                desc: 'Coloración profesional con productos sin amoníaco',
                icon: '🎨'
              }
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 rounded-2xl p-6 border border-amber-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipo */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Nuestro equipo</h2>
            <p className="mt-4 text-xl text-gray-600">Profesionales con años de experiencia</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Ivan Lobos',
                role: 'Barbero',
                exp: '3 años de experiencia',
                spec: 'Especialista en cortes modernos y coloracion',
                photo: 'Ivan'
              },
              {
                name: 'Mati Broda',
                role: 'Barbero',
                exp: '2 años de experiencia',
                spec: 'Coloración, peinados y tratamientos capilares',
                photo: 'matias'
              }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl">🧑‍🦱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{p.name}</h3>
                  <p className="text-amber-600 font-medium">{p.role}</p>
                  <p className="mt-2 text-gray-600">{p.exp}</p>
                  <p className="mt-2 italic text-gray-700">"{p.spec}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


{/* Reseñas */}
<div className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
      <p className="mt-4 text-xl text-gray-600">Experiencias reales</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        {
          name: 'Carlos M.',
          text: '¡Increíble atención! Juan me hizo un corte que me duró 3 semanas impecable.',
          stars: 5
        },
        {
          name: 'Gonzalo D.',
          text: 'Ivan es una artista con las tijeras. Siempre salgo feliz y con estilo.',
          stars: 5
        },
        {
          name: 'Martín P.',
          text: 'Puntualidad, limpieza y profesionalismo. El mejor lugar para cuidar tu imagen.',
          stars: 5
        }
      ].map((review, i) => (
        <div key={i} className="bg-blue-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex text-amber-400 mb-3">
            {'★'.repeat(review.stars)}
          </div>
          <p className="text-gray-700 italic mb-4">"{review.text}"</p>
          <p className="font-bold text-gray-900">— {review.name}</p>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Horarios y ubicación */}
<div className="py-16 bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl font-bold mb-6">📍 Ubicación</h2>
        
        {/* ✅ MAPA REAL (reemplaza el placeholder) */}
        <div className="rounded-xl overflow-hidden h-64 shadow-lg mb-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26205.270145277067!2d-58.39268062960891!3d-34.81452584844636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd30013c5cc67%3A0x3fb4d6be5f05cd51!2sBLASS%20BARBER%C3%8DA!5e0!3m2!1ses!2sar!4v1767111852536!5m2!1ses!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de BLASS BARBERÍA"
            className="w-full h-full"
          ></iframe>
        </div>
              
              <div className="space-y-4">
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span>Av. San Martin 1709 Adrogue</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📞</span>
                  <span>5491151267846</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📱</span>
                  <span><a href="https://wa.me/5491151267846?text=Hola,%20quiero%20reservar%20un%20turno" className="text-amber-300 hover:underline">Reservar por WhatsApp</a></span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📸</span>
                  <span><a href="#" className="text-amber-300 hover:underline">@peluqueriaBlass</a></span>
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
                  <div key={i} className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="font-medium">{h.day}</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-500 p-4 rounded-lg text-center">
                <p className="font-bold">¡Reservá tu turno y evitá esperas!</p>
                <Link 
                  href="/turnos"
                  className="mt-2 inline-block bg-white text-blue-800 font-bold py-2 px-6 rounded-full"
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
    href="https://wa.me/5491112345678"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105"
    aria-label="WhatsApp"
  >
    <span className="text-3xl">💬</span>
  </a>
</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Peluquería Blass. Todos los derechos reservados.</p>
          <p className="mt-2 text-amber-300">¡Gracias por confiar en nosotros!</p>
        </div>
      </footer>
    </div>
  );
}