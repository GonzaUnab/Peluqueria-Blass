'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Turno = {
    id: number;
    cliente_nombre: string;
    servicio: string;
    fecha_hora: string;
    duracion_min: number;
    estado: string;
};

export default function IvanPage() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
    const cargarTurnos = async () => {
        setCargando(true);
        try {
        const hoy = new Date().toISOString().slice(0, 10);
        const res = await fetch(`https://peluqueria-blass-1.onrender.com/api/peluquero/Ivan/${hoy}`);
        const data = await res.json();
        setTurnos(data.turnos || []);
        } catch (err) {
        console.error('❌ Error al cargar turnos:', err);
        setMensaje('⚠️ No se pudieron cargar los turnos.');
        } finally {
        setCargando(false);
        }
    };
    cargarTurnos();
    }, []);

    const cambiarEstado = async (id: number, estado: string) => {
    try {
        await fetch(`https://peluqueria-blass-1.onrender.com/api/turnos/${id}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
        });
        setTurnos(turnos.map(t => t.id === id ? { ...t, estado } : t));
    } catch (err) {
        alert('❌ Error al actualizar');
    }
    };

  // Estadísticas
const totalTurnos = turnos.length;
const tiempoTotal = turnos.reduce((sum, t) => sum + t.duracion_min, 0);
const proximo = turnos.find(t => 
    new Date(t.fecha_hora) > new Date() && t.estado !== 'cancelado'
);
const tiempoProximo = proximo 
    ? Math.round((new Date(proximo.fecha_hora).getTime() - Date.now()) / 60000) 
    : null;

return (
    <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
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
          {/* Header */}
            <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl font-bold">I</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">👨‍💼 Iván</h1>
            <p className="text-gray-600">
                {new Date().toLocaleDateString('es-AR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
                })}
            </p>
            </div>

          {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-800">{totalTurnos}</div>
                <div className="text-xs text-blue-700">Turnos</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-green-800">{tiempoTotal}′</div>
                <div className="text-xs text-green-700">Estimado</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-amber-800">
                {proximo ? `${tiempoProximo}′` : '—'}
                </div>
                <div className="text-xs text-amber-700">Próximo</div>
            </div>
            </div>

          {/* Lista de turnos */}
            <div className="space-y-3">
            {cargando ? (
                <div className="text-center py-6 text-gray-500">Cargando...</div>
            ) : turnos.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                🎉 ¡Hoy no tenés turnos!
                </div>
            ) : (
                turnos.map(t => {
                const hora = new Date(t.fecha_hora).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const esHoy = new Date(t.fecha_hora).toDateString() === new Date().toDateString();
                const esPasado = new Date(t.fecha_hora) < new Date();

                return (
                    <div 
                    key={t.id}
                    className={`p-4 rounded-lg border ${
                        t.estado === 'finalizado' 
                        ? 'bg-green-50 border-green-200' 
                        : t.estado === 'cancelado'
                        ? 'bg-red-50 border-red-200 line-through'
                        : esPasado && t.estado !== 'finalizado'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-white border-gray-200'
                    }`}
                    >
                    <div className="flex justify-between items-start">
                        <div>
                        <div className="font-bold">{hora}</div>
                        <div className="font-medium">{t.cliente_nombre}</div>
                        <div className="text-sm text-gray-600">{t.servicio}</div>
                        </div>
                        <div className="flex gap-1">
                        {t.estado !== 'finalizado' && t.estado !== 'cancelado' && (
                            <>
                            <button
                                onClick={() => cambiarEstado(t.id, 'finalizado')}
                                className="px-2 py-1 bg-green-500 text-white text-xs rounded"
                            >
                                ✔️
                            </button>
                            <button
                                onClick={() => cambiarEstado(t.id, 'cancelado')}
                                className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                            >
                                ❌
                            </button>
                            </>
                        )}
                        {t.estado === 'finalizado' && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            ✔️ Hecho
                            </span>
                        )}
                        {t.estado === 'cancelado' && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            ❌ Cancelado
                            </span>
                        )}
                        </div>
                    </div>
                    </div>
                );
                })
            )}
            </div>

          {/* Botón para panel completo */}
        <div className="mt-6 text-center">
            <Link 
            href="/admin"
            className="inline-block bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
            📊 Ver panel completo
            </Link>
            </div>
            </div>
        </div>
    </div>
    );
}