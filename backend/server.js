// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Resend (reemplaza Nodemailer)
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Conectar a SQLite
const db = new sqlite3.Database('./peluqueria.db', (err) => {
    if (err) {
        console.error('❌ Error al abrir la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a SQLite (peluqueria.db)');
    }
});

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS turnos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_nombre TEXT NOT NULL,
        cliente_email TEXT,
        cliente_telefono TEXT,
        peluquero TEXT NOT NULL,
        servicio TEXT NOT NULL,
        fecha_hora TEXT NOT NULL,
        duracion_min INTEGER DEFAULT 30,
        notas TEXT,
        estado TEXT DEFAULT 'pendiente',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('❌ Error al crear tabla:', err.message);
    } else {
        console.log('✅ Tabla "turnos" lista');
    }
});

// Ruta: opciones fijas
app.get('/api/opciones', (req, res) => {
    res.json({
        peluqueros: ['Ivan', 'Matias'],
        servicios: [
            { nombre: 'Corte de cabello', duracion_min: 30 },
            { nombre: 'Corte + Barba', duracion_min: 45 },
            { nombre: 'color', duracion_min: 60 },
            { nombre: 'Jubilados', duracion_min: 60 },
            { nombre: 'Claritos', duracion_min: 60 },
        ]
    });
});

// ✅ Función con Resend (sin Nodemailer)
async function enviarConfirmacionEmail(cliente_email, cliente_nombre, peluquero, servicio, fecha_hora) {
    const fecha = new Date(fecha_hora).toLocaleString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // ✅ URLs corregidas (sin espacios)
    const logoUrl = "https://i.ibb.co/4wdJxXBb/logo.jpg";
    const whatsappUrl = `https://wa.me/5491151267846?text=✅+Tu+turno+está+confirmado%0A%0ABarbero:+${peluquero}%0AServicio:+${servicio}%0AFecha:+${encodeURIComponent(fecha)}`;

    try {
        const data = await resend.emails.send({
            from: `"✂️ Peluquería Blass" <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
            to: cliente_email,
            subject: `✅ Turno confirmado - ${cliente_nombre}`,
            html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111827;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <img 
                        src="${logoUrl}"
                        alt="Peluquería Blass"
                        style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 12px;"
                    />
                    <h1 style="font-size: 24px; font-weight: 700; margin: 0;">¡Hola, ${cliente_nombre}!</h1>
                    <p style="font-size: 16px; color: #4b5563; margin: 8px 0 0 0;">Tu turno está confirmado ✅</p>
                </div>

                <div style="background: #f9fafb; border-left: 4px solid #000; padding: 16px; margin: 24px 0; border-radius: 0 6px 6px 0;">
                    <h2 style="margin: 0 0 12px 0; color: #000; font-size: 18px; font-weight: 700;">📅 Detalles del turno</h2>
                    <p style="margin: 6px 0;"><strong>Barbero:</strong> ${peluquero}</p>
                    <p style="margin: 6px 0;"><strong>Servicio:</strong> ${servicio}</p>
                    <p style="margin: 6px 0;"><strong>Fecha y hora:</strong> ${fecha}</p>
                </div>

                <div style="text-align: center; padding: 16px; background: #f3f4f6; border-radius: 8px; margin: 24px 0;">
                    <p style="margin: 4px 0; color: #111827;">
                        📍 <strong>Dirección:</strong> Av. San Martín 1709, Adrogué
                    </p>
                    <p style="margin: 4px 0;">
                        📞 <strong>Teléfono:</strong> (11) 5126-7846
                    </p>
                    <p style="margin: 4px 0;">
                        💬 <a href="${whatsappUrl}" style="color: #111827; text-decoration: underline; font-weight: 600;">Confirmar por WhatsApp</a>
                    </p>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                  <a 
                    href="https://peluqueria-blass.onrender.com/api/calendario/0"
                    style="display: inline-block; background: #4285F4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    📅 Agregar a Google Calendar
                  </a>
                  <p style="font-size: 12px; color: #6b7280; margin-top: 6px;">Hacé clic y el turno se agrega automáticamente</p>
                </div>
            </div>
            `
        });
        console.log('✅ Email enviado con Resend. ID:', data?.id || 'sin ID');
        return data;
    } catch (error) {
        console.error('❌ Error con Resend:', error);
        throw error;
    }
}

// ✅ Ruta: crear turno (con Resend)
app.post('/api/turnos', (req, res) => {
    const { cliente_nombre, cliente_email, peluquero, servicio, fecha_hora } = req.body;

    if (!cliente_nombre || !peluquero || !servicio || !fecha_hora) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const duracion_min = req.body.duracion_min || 30;

    const stmt = db.prepare(`
        INSERT INTO turnos (
            cliente_nombre, cliente_email, cliente_telefono,
            peluquero, servicio, fecha_hora, duracion_min, notas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        cliente_nombre,
        cliente_email || null,
        req.body.cliente_telefono || null,
        peluquero,
        servicio,
        fecha_hora,
        duracion_min,
        req.body.notas || null,
        async function (err) {
            if (err) {
                console.error('❌ Error al insertar:', err.message);
                return res.status(500).json({ error: 'Error al guardar turno' });
            }

            try {
                if (cliente_email) {
                    await enviarConfirmacionEmail(cliente_email, cliente_nombre, peluquero, servicio, fecha_hora);
                }
                res.status(201).json({
                    id: this.lastID,
                    message: '✅ Turno reservado. ¡Te enviamos un email de confirmación!'
                });
            } catch (emailErr) {
                console.error('❌ Error al enviar email:', emailErr.message);
                res.status(201).json({
                    id: this.lastID,
                    message: '✅ Turno reservado, pero hubo un problema al enviar el email.'
                });
            }
        }
    );
});

// ✅ Generar .ics para Google Calendar
app.get('/api/calendario/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM turnos WHERE id = ?', [id], (err, turno) => {
        if (err || !turno) {
            return res.status(404).send('Turno no encontrado');
        }

        const inicio = new Date(turno.fecha_hora);
        const fin = new Date(inicio.getTime() + (turno.duracion_min || 30) * 60000);

        // Formato ISO sin : para ICS
        const formatDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Peluquería Blass//Turno//ES
BEGIN:VEVENT
UID:${turno.id}@blass.com.ar
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(inicio)}
DTEND:${formatDate(fin)}
SUMMARY:Cita en Peluquería Blass
DESCRIPTION:Barbero: ${turno.peluquero}\\nServicio: ${turno.servicio}\\n${turno.notas || ''}
LOCATION:Av. San Martín 1709, Adrogué
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Recordatorio de turno
END:VALARM
END:VEVENT
END:VCALENDAR`;

        res.setHeader('Content-Type', 'text/calendar');
        res.setHeader('Content-Disposition', `attachment; filename="turno-blass-${turno.id}.ics"`);
        res.send(icsContent);
    });
});

// ✅ Listar turnos con filtro (única ruta /api/turnos)
app.get('/api/turnos', (req, res) => {
    const { filtro } = req.query;
    let sql = 'SELECT * FROM turnos';
    let params = [];

    if (filtro === 'hoy') {
        sql += ' WHERE DATE(fecha_hora) = DATE("now")';
    } else if (filtro === 'mañana') {
        sql += ' WHERE DATE(fecha_hora) = DATE("now", "+1 day")';
    }

    sql += ' ORDER BY fecha_hora ASC';

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ✅ Actualizar estado de turno
app.patch('/api/turnos/:id/estado', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['pendiente', 'confirmado', 'finalizado', 'cancelado'].includes(estado)) {
        return res.status(400).json({ error: 'Estado inválido' });
    }

    db.run(
        `UPDATE turnos SET estado = ? WHERE id = ?`,
        [estado, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Turno no encontrado' });
            }
            res.json({ message: 'Estado actualizado' });
        }
    );
});

// Ruta: recordatorios
app.post('/api/recordatorios', async (req, res) => {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fecha = manana.toISOString().slice(0, 10);
    db.all(`SELECT * FROM turnos WHERE DATE(fecha_hora) = ? AND estado = 'confirmado'`, [fecha], (err, turnos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ enviados: turnos.length });
    });
});

// ✅ NUEVO: Obtener horarios por día
app.get('/api/horarios/:fecha', (req, res) => {
    const { fecha } = req.params;
    db.all(`
        SELECT strftime('%H:%M', fecha_hora) as hora, peluquero, servicio 
        FROM turnos 
        WHERE DATE(fecha_hora) = ? AND estado = 'pendiente'
        ORDER BY fecha_hora
    `, [fecha], (err, turnos) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const horariosBase = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];
        const horarios = horariosBase.map(hora => {
            const turno = turnos.find(t => t.hora === hora);
            return {
                hora,
                estado: turno ? 'ocupado' : 'libre',
                peluquero: turno?.peluquero || null,
                servicio: turno?.servicio || null
            };
        });
        
        res.json({ fecha, horarios });
    });
});

// ✅ NUEVO: Horarios de un peluquero
app.get('/api/peluquero/:nombre/:fecha', (req, res) => {
    const { nombre, fecha } = req.params;
    db.all(`
        SELECT cliente_nombre, servicio, strftime('%H:%M', fecha_hora) as hora
        FROM turnos 
        WHERE peluquero = ? AND DATE(fecha_hora) = ? AND estado = 'pendiente'
        ORDER BY fecha_hora
    `, [nombre, fecha], (err, turnos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ peluquero: nombre, fecha, turnos });
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend corriendo en http://0.0.0.0:${PORT}`);
});