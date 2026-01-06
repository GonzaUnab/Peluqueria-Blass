'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Turno = {
    id: number;
    cliente_nombre: string;
    peluquero: string;
    servicio: string;
    fecha_hora: string;
    duracion_min: number;
    estado: string;
};

export default function AdminPage() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [filtro, setFiltro] = useState('hoy');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    const cargarTurnos = async () => {
        setCargando(true);
        try {
        const url = filtro === 'todos' 
            ? '/api/turnos' 
            : `/api/turnos?filtro=${filtro}`;
        const res = await fetch(url);
        const data = await res.json();
        setTurnos(data);
        } catch (err) {
        console.error('❌ Error al cargar turnos:', err);
        } finally {
        setCargando(false);
        }
    };
    cargarTurnos();
    }, [filtro]);

    const cambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
        await fetch('https://peluqueria-blass-1.onrender.com/api/turnos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
        });
        setTurnos(turnos.map(t => 
        t.id === id ? { ...t, estado: nuevoEstado } : t
        ));
    } catch (err) {
        alert('❌ Error al actualizar');
    }
    };

  // Estadísticas
    const stats = {
    hoy: turnos.filter(t => t.estado !== 'cancelado').length,
    tiempo: turnos.reduce((sum, t) => sum + t.duracion_min, 0),
    cortes: turnos.filter(t => t.servicio.includes('Corte')).length
    };

    return (
    <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
            <Link href="/" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium">
            ← Volver a la peluquería
            </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">👨‍💼 Panel de Administración</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-800">{stats.hoy}</div>
                <div className="text-sm text-blue-700">Turnos hoy</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-800">{stats.tiempo} min</div>
                <div className="text-sm text-green-700">Tiempo estimado</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-800">{stats.cortes}</div>
                <div className="text-sm text-amber-700">Cortes</div>
            </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
            {['hoy', 'mañana', 'todos'].map(f => (
                <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg ${
                    filtro === f 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
            <button 
                onClick={() => {
                const csv = 'ID,Cliente,Peluquero,Servicio,Fecha,Hora,Estado\n' + 
                    turnos.map(t => 
                    `${t.id},"${t.cliente_nombre}","${t.peluquero}","${t.servicio}","${new Date(t.fecha_hora).toLocaleDateString()}","${new Date(t.fecha_hora).toLocaleTimeString()}",${t.estado}`
                    ).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `turnos-${new Date().toISOString().slice(0,10)}.csv`;
                a.click();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                📤 Exportar a Excel
            </button>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 text-left">Cliente</th>
                    <th className="p-3 text-left">Peluquero</th>
                    <th className="p-3 text-left">Servicio</th>
                    <th className="p-3 text-left">Fecha y hora</th>
                    <th className="p-3 text-left">Estado</th>
                    <th className="p-3 text-left">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {cargando ? (
                    <tr><td colSpan={6} className="text-center py-4">Cargando...</td></tr>
                ) : turnos.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-4 text-gray-500">Sin turnos</td></tr>
                ) : (
                    turnos.map(t => (
                    <tr key={t.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-medium">{t.cliente_nombre}</td>
                        <td className="p-3">{t.peluquero}</td>
                        <td className="p-3">{t.servicio}</td>
                        <td className="p-3">{new Date(t.fecha_hora).toLocaleString('es-AR')}</td>
                        <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            t.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            t.estado === 'confirmado' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {t.estado}
                        </span>
                        </td>
                        <td className="p-3">
                        <div className="flex gap-1">
                            <button 
                            onClick={() => cambiarEstado(t.id, 'confirmado')}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                            disabled={t.estado === 'confirmado'}
                            >
                            ✅ Confirmar
                            </button>
                            <button 
                            onClick={() => cambiarEstado(t.id, 'finalizado')}
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                            disabled={t.estado === 'finalizado'}
                            >
                            ✔️ Finalizar
                            </button>
                            <button 
                            onClick={() => cambiarEstado(t.id, 'cancelado')}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                            disabled={t.estado === 'cancelado'}
                            >
                            ❌ Cancelar
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
    );
}