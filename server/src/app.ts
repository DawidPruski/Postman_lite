import express from "express";
import cors from 'cors';
import axios from "axios";

const app = express();

// Middleware do parsowania JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));

app.post("/api", async (req: express.Request, res: express.Response) => {
    const { Method, URL } = req.body; // Odczytaj dane z żądania
    console.log(`Received Method: ${Method}, URL: ${URL}`);

    try {
        let response;
        switch (Method) {
            case "GET":
                response = await axios.get(URL);
                break;
            case "POST":
                response = await axios.post(URL, req.body.data);
                break;
            case "PUT":
                response = await axios.put(URL, req.body.data);
                break;
            case "DELETE":
                response = await axios.delete(URL);
                break;
            case "PATCH":
                response = await axios.patch(URL, req.body.data);
                break;
            default:
                return res.status(400).json({ message: 'Invalid method' });
        }
        res.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});