import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';

const app = express();
const port = process.env.PORT || 4001;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
   res.send(`Servidor Express escuchando en http://localhost:${port}`);
});
// router controller
app.use('/api/', router)

app.listen(port, () => {
   console.log(`Servidor Express escuchando en http://localhost:${port}`);
});