import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json([{ id: 1, name: 'Product 1', description: '' }, { id: 2, name: 'Product 2', description: '' }]);
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
