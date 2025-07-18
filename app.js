require('dotenv').config();

// Importamos Express, Mongoose y cors
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para JSON y CORS
app.use(express.json());
app.use(cors());

// ======================================
// Conexión a la base de datos MongoDB
// ======================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("¡Base de datos conectada exitosamente!");
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos", err);
    });

// ======================================
// Definición del esquema y el modelo de Mongoose
// ======================================
const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

// ======================================
// Rutas de la API de Tareas
// ======================================

// Ruta GET para obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
    try {
        // Usamos el modelo Task para buscar todas las tareas en la base de datos
        const allTasks = await Task.find();
        res.json(allTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta POST para añadir una nueva tarea
app.post('/api/tasks', async (req, res) => {
    try {
        // Creamos un nuevo documento de tarea a partir de la solicitud
        const newTask = new Task(req.body);
        // Guardamos el documento en la base de datos
        const savedTask = await newTask.save();
        // Enviamos la nueva tarea como respuesta
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ======================================
// Le decimos a la aplicación que escuche en el puerto
// ======================================
app.listen(port, () => {
    console.log(`La API de tareas está corriendo en http://localhost:${port}`);
});