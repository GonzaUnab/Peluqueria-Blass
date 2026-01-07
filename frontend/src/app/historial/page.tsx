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

export default function HistorialPage() {
    const [peluquero, setPeluquero] = useState<'Ivan' | 'Matias'>('Ivan');
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState('');

useEffect(() => {
    const cargarHistorial = async () => {
        setCargando(true);
        try {
        // Obtener últimos 30 días
        const hoy = new Date();
        const hace30 = new Date();
        hace30.setDate(hoy.getDate() - 30);
        const fechaDesde = hace30.toISOString().slice(0, 10);
        
        const res = await fetch(`https://peluqueria-blass-1.onrender.com/api/peluquero/${peluquero}/${fechaDesde}`);
        const data = await res.json();
        
        // Filtrar solo turnos finalizados/pasados
        const historial = (data.turnos || []).filter((t: Turno) => {
            return new Date(t.fecha_hora) <= new Date() && t.estado !== 'cancelado';
        }).sort((a: Turno, b: Turno) => 
            new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime()
        );
        
        setTurnos(historial);
        } catch (err) {
        console.error('❌ Error al cargar historial:', err);
        setMensaje('⚠️ No se pudo cargar el historial.');
        } finally {
        setCargando(false);
        }
    };
    cargarHistorial();
}, [peluquero]);

  // Estadísticas
    const stats = {
    total: turnos.length,
    cortes: turnos.filter(t => t.servicio.includes('Corte')).length,
    colores: turnos.filter(t => t.servicio.includes('color') || t.servicio.includes('Color')).length,
    tiempo: turnos.reduce((sum, t) => sum + t.duracion_min, 0),
};

return (
    <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
            <Link 
            href="/" 
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium"
            >
            ← Volver a la peluquería
            </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Selector */}
            <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                type="button"
                onClick={() => setPeluquero('Ivan')}
                className={`px-4 py-2 text-sm font-medium ${
                    peluquero === 'Ivan'
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                } rounded-l-lg border border-r-0`}
                >
                👨‍💼 Iván
                </button>
                <button
                type="button"
                onClick={() => setPeluquero('Matias')}
                className={`px-4 py-2 text-sm font-medium ${
                    peluquero === 'Matias'
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                } rounded-r-lg border`}
                >
                👨‍💼 Matías
                </button>
            </div>
            </div>

          {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-800">{stats.total}</div>
                <div className="text-xs text-blue-700">Últimos 30 días</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-green-800">{stats.tiempo}′</div>
                <div className="text-xs text-green-700">Trabajados</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-amber-800">{stats.cortes}</div>
                <div className="text-xs text-amber-700">Cortes</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-800">{stats.colores}</div>
                <div className="text-xs text-purple-700">Color/Claritos</div>
            </div>
            </div>

          {/* Lista */}
            <h2 className="font-bold text-gray-800 mb-3">📅 Últimos turnos</h2>
            <div className="space-y-3">
            {cargando ? (
                <div className="text-center py-4 text-gray-500">Cargando...</div>
            ) : turnos.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                📉 No hay turnos finalizados aún.
                </div>
            ) : (
                turnos.slice(0, 10).map(t => {
                const fecha = new Date(t.fecha_hora).toLocaleDateString('es-AR');
                const hora = new Date(t.fecha_hora).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                return (
                    <div key={t.id} className="p-3 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between">
                        <div>
                        <div className="font-medium">{t.cliente_nombre}</div>
                        <div className="text-sm text-gray-600">{t.servicio}</div>
                        </div>
                        <div className="text-right">
                        <div className="font-mono text-sm">{hora}</div>
                        <div className="text-xs text-gray-500">{fecha}</div>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs">
                        <span className="px-2 py-1 bg-gray-100 rounded">{t.duracion_min}′</span>
                        <span className={`px-2 py-1 rounded ${
                        t.estado === 'finalizado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                        {t.estado}
                        </span>
                    </div>
                    </div>
                );
                })
            )}
            </div>

          {/* Botón exportar */}
            {turnos.length > 0 && (
            <div className="mt-6">
                <button
                onClick={() => {
                    const csv = [
                    ['Fecha', 'Cliente', 'Servicio', 'Duración (min)', 'Estado'],
                    ...turnos.map(t => [
                        new Date(t.fecha_hora).toLocaleDateString('es-AR'),
                        t.cliente_nombre,
                        t.servicio,
                        t.duracion_min,
                        t.estado
                    ])
                    ]
                    .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
                    .join('\n');

                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `historial-${peluquero.toLowerCase()}-30dias.csv`;
                    a.click();
                    URL.revokeObjectURL(url);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                📤 Exportar historial ({turnos.length} registros)
                </button>
            </div>
            )}
        </div>
        </div>
    </div>
    );
}