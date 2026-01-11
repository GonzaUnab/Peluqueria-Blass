'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Tipado de las opciones (peluqueros y servicios)
type Opciones = {
    peluqueros: string[];
    servicios: { nombre: string; duracion_min: number }[];
};

// Tipado de los horarios disponibles desde la API
type Horario = {
    hora: string;
    estado: 'libre' | 'ocupado';
    peluquero?: string | null;
    servicio?: string | null;
};

export default function TurnosPage() {
    // Estados principales del formulario
    const [opciones, setOpciones] = useState<Opciones | null>(null);
    const [horariosDisponibles, setHorariosDisponibles] = useState<Horario[]>([]);
    const [formData, setFormData] = useState({
        cliente_nombre: '',
        cliente_email: '',
        cliente_telefono: '',
        peluquero: 'Ivan',
        servicio: 'Corte de cabello',
        fecha_hora: '',
        notas: '',
    });
    const [mensaje, setMensaje] = useState('');

    // 🔄 Cargar opciones y horarios al iniciar
    useEffect(() => {
        // 1. Cargar peluqueros y servicios
        fetch('https://peluqueria-blass-1.onrender.com/api/opciones')
            .then(res => res.json())
            .then(data => {
                setOpciones(data);
                if (data.peluqueros.length > 0 && data.servicios.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        peluquero: data.peluqueros[0],
                        servicio: data.servicios[0].nombre
                    }));
                }
            })
            .catch(err => {
                console.error('❌ No se pudo cargar opciones:', err);
                setMensaje('⚠️ Error al conectar con el servidor.');
            });

        // 2. Cargar horarios disponibles HOY
        const hoy = new Date().toISOString().slice(0, 10);
        fetch(`https://peluqueria-blass-1.onrender.com/api/horarios/${hoy}`)
            .then(res => res.json())
            .then(data => {
                setHorariosDisponibles(data.horarios || []);
            })
            .catch(err => {
                console.error('❌ No se pudieron cargar horarios:', err);
                // Si falla, mostramos horarios base como fallback
                setHorariosDisponibles([
                    { hora: '10:00', estado: 'libre' },
                    { hora: '11:30', estado: 'libre' },
                    { hora: '14:00', estado: 'libre' },
                    { hora: '16:30', estado: 'libre' },
                    { hora: '18:00', estado: 'libre' },
                ]);
            });
    }, []);

    // 📝 Manejar cambios en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ✅ Enviar turno al backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.cliente_nombre || !formData.cliente_email || !formData.fecha_hora) {
            setMensaje('⚠️ Completá nombre, email y fecha.');
            return;
        }

        try {
            const res = await fetch('https://peluqueria-blass-1.onrender.com/api/turnos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error desconocido');
            }

            // ✅ Éxito: limpiar formulario y mostrar mensaje
            setMensaje(data.message);
            setFormData({
                cliente_nombre: '',
                cliente_email: '',
                cliente_telefono: '',
                peluquero: opciones?.peluqueros[0] || 'Ivan',
                servicio: opciones?.servicios[0]?.nombre || 'Corte de cabello',
                fecha_hora: '',
                notas: '',
            });
        } catch (err: any) {
            console.error('❌ Error al enviar:', err);
            setMensaje(`❌ ${err.message}`);
        }
    };

    // 🕑 Seleccionar horario (solo si está libre)
    const seleccionarHorario = (hora: string) => {
        const horario = horariosDisponibles.find(h => h.hora === hora);
        if (horario?.estado === 'libre') {
            const fechaHoy = new Date().toISOString().slice(0, 11); // "YYYY-MM-DDT"
            setFormData(prev => ({
                ...prev,
                fecha_hora: `${fechaHoy}${hora}:00`
            }));
        }
    };

    // ⏳ Mientras carga
    if (!opciones) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-2xl">⏳ Cargando...</div>
                {mensaje && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{mensaje}</div>}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto">
                {/* ← Volver */}
                <div className="mb-6 text-center">
                    <Link 
                        href="/" 
                        className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium"
                    >
                        ← Volver a la peluquería
                    </Link>
                </div>

                {/* Logo y título */}
                <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black shadow-sm mx-auto mb-4">
                        <img 
                            src="/logo.jpg" 
                            alt="Peluquería Blass" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Reservá tu turno</h1>
                    <p className="text-gray-600">Rápido, fácil y sin llamadas</p>
                </div>

                {/* Mensaje de éxito/error */}
                {mensaje && (
                    <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
                        mensaje.includes('✅') 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {mensaje}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre - texto oscuro */}
                    <input
                        name="cliente_nombre"
                        value={formData.cliente_nombre}
                        onChange={handleChange}
                        placeholder="Nombre *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500"
                    />
                    
                    {/* Email - texto oscuro */}
                    <input
                        name="cliente_email"
                        type="email"
                        value={formData.cliente_email}
                        onChange={handleChange}
                        placeholder="Email *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500"
                    />
                    
                    {/* Teléfono - opcional */}
                    <input
                        name="cliente_telefono"
                        value={formData.cliente_telefono}
                        onChange={handleChange}
                        placeholder="Teléfono (opcional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500"
                    />
                    
                    {/* Peluquero */}
                    <select
                        name="peluquero"
                        value={formData.peluquero}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black text-gray-900"
                    >
                        {opciones.peluqueros.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    
                    {/* Servicio */}
                    <select
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black text-gray-900"
                    >
                        {opciones.servicios.map(s => (
                            <option key={s.nombre} value={s.nombre}>
                                {s.nombre} ({s.duracion_min} min)
                            </option>
                        ))}
                    </select>
                    
                    {/* Fecha y hora manual */}
                    <input
                        name="fecha_hora"
                        type="datetime-local"
                        value={formData.fecha_hora}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-gray-900"
                    />

                    {/* 🔑 HORARIOS DISPONIBLES HOY (con estado visual) */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">Horarios disponibles hoy:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {horariosDisponibles.length > 0 ? (
                                horariosDisponibles.map(h => (
                                    <button
                                        key={h.hora}
                                        type="button"
                                        disabled={h.estado === 'ocupado'}
                                        onClick={() => seleccionarHorario(h.hora)}
                                        className={`px-3 py-2 rounded-lg text-center transition ${
                                            h.estado === 'ocupado'
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {h.hora} {h.estado === 'ocupado' && '❌'}
                                    </button>
                                ))
                            ) : (
                                <div className="col-span-2 text-center text-gray-500">Cargando...</div>
                            )}
                        </div>
                    </div>

                    {/* Notas */}
                    <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        placeholder="Notas (ej: dejar más largo arriba)"
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500"
                    />
                    
                    {/* Botón de reserva */}
                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition shadow-md"
                    >
                        ✅ Reservar turno
                    </button>
                </form>
            </div>

            {/* 💬 WhatsApp para reservar por mensaje */}
            <div className="mt-6 text-center text-sm text-gray-700">
                <p>
                    ¿Preferís reservar por{' '}
                    <a 
                        href="https://wa.me/5491151267846?text=Hola,%20quiero%20reservar%20un%20turno%20en%20Peluquer%C3%ADa%20Blass" 
                        className="font-medium text-black hover:underline"
                    >
                        WhatsApp
                    </a>
                    ?
                </p>
            </div>
        </div>
    );
}