'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Opciones = {
    peluqueros: string[];
    servicios: { nombre: string; duracion_min: number }[];
};

export default function TurnosPage() {
    const [opciones, setOpciones] = useState<Opciones | null>(null);
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

    // Cargar opciones al iniciar
    useEffect(() => {
        fetch('http://localhost:3001/api/opciones')
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
                setMensaje('⚠️ Error al conectar con el servidor. ¿Está el backend corriendo?');
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.cliente_nombre || !formData.fecha_hora) {
            setMensaje('⚠️ Completá nombre y fecha.');
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/turnos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error desconocido');
            }

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
                {/* Botón para volver a la home */}
                <div className="mb-6 text-center">
                    <Link 
                        href="/" 
                        className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium"
                    >
                        ← Volver a la peluquería
                    </Link>
                </div>

                {/* Logo + título */}
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

                {mensaje && (
                    <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
                        mensaje.includes('✅') 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {mensaje}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="cliente_nombre"
                        value={formData.cliente_nombre}
                        onChange={handleChange}
                        placeholder="Nombre *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    />
                    
                    <input
                        name="cliente_email"
                        type="email"
                        value={formData.cliente_email}
                        onChange={handleChange}
                        placeholder="Email (opcional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    />
                    
                    <input
                        name="cliente_telefono"
                        value={formData.cliente_telefono}
                        onChange={handleChange}
                        placeholder="Teléfono (opcional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    />
                    
                    <select
                        name="peluquero"
                        value={formData.peluquero}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black"
                    >
                        {opciones.peluqueros.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    
                    <select
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black"
                    >
                        {opciones.servicios.map(s => (
                            <option key={s.nombre} value={s.nombre}>
                                {s.nombre} ({s.duracion_min} min)
                            </option>
                        ))}
                    </select>
                    
                    <input
                        name="fecha_hora"
                        type="datetime-local"
                        value={formData.fecha_hora}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    />
                    
                    {/* Selector de horarios */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Horarios disponibles hoy:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['10:00', '11:30', '14:00', '16:30', '18:00'].map(hora => (
                                <button
                                    key={hora}
                                    type="button"
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        fecha_hora: `${new Date().toISOString().slice(0, 11)}${hora}:00`
                                    }))}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-center transition"
                                >
                                    {hora}
                                </button>
                            ))}
                        </div>
                    </div>

                    <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        placeholder="Notas (ej: dejar más largo arriba)"
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    />
                    
                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition shadow-md"
                    >
                        ✅ Reservar turno
                    </button>
                </form>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>¿Problemas? Contactanos por <strong><a href="https://wa.me/5491151267846" className="text-black hover:underline">WhatsApp</a></strong></p>
            </div>
        </div>
    );
}