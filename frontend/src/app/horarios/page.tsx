'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ✅ Tipado para los horarios
type Horario = {
    hora: string;
    estado: 'libre' | 'ocupado';
    peluquero: string | null;
    servicio: string | null;
};

export default function HorariosPage() {
  // ✅ Estado tipado
    const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0, 10));
    const [horarios, setHorarios] = useState<Horario[]>([]);

  // ✅ Cargar horarios
    useEffect(() => {
    const cargarHorarios = async () => {
        try {
        const res = await fetch(`https://peluqueria-blass-1.onrender.com/api/horarios/${fecha}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setHorarios(data.horarios || []);
        } catch (err) {
        console.error('❌ Error al cargar horarios:', err);
        setHorarios([]); // fallback seguro
        }
    };
    cargarHorarios();
    }, [fecha]);

  // ✅ Función tipada (días: number)
    const cambiarDia = (dias: number) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setFecha(nuevaFecha.toISOString().slice(0, 10));
    };

  // ✅ Formateo manual en español (sin date-fns/locale)
    const formatFecha = (isoFecha: string): string => {
    const d = new Date(isoFecha);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]}`;
    };

    return (
    <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
        {/* Botón para volver */}
        <div className="mb-6 text-center">
            <Link 
            href="/" 
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium"
            >
            ← Volver a la peluquería
            </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
            <button 
                onClick={() => cambiarDia(-1)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
                ← Anterior
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
                {formatFecha(fecha)}
            </h1>
            <button 
                onClick={() => cambiarDia(1)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
                Siguiente →
            </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {horarios.length > 0 ? (
                horarios.map((h, i) => (
                <div 
                    key={i}
                    className={`p-5 rounded-xl text-center border-2 ${
                    h.estado === 'ocupado' 
                        ? 'bg-red-50 border-red-200 text-red-800' 
                        : 'bg-green-50 border-green-200 text-green-800'
                    }` }
                >
                    <div className="font-bold text-xl">{h.hora}</div>
                    <div className="text-sm mt-2 font-medium whitespace-pre-line">
                    {h.estado === 'ocupado' 
                        ? `⚠️ ${h.peluquero || '—'}\n${h.servicio || '—'}` 
                        : '✅ Libre'}
                    </div>
                </div>
                ))
            ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                {horarios.length === 0 ? 'Cargando...' : 'Sin horarios disponibles'}
                </div>
            )}
            </div>

            <div className="mt-8 text-center">
            <Link 
                href="/turnos"
                className="inline-block bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition"
            >
                📅 Reservar turno
            </Link>
            </div>
        </div>
        </div>
    </div>
    );
}