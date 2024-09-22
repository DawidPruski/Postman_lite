import express from "express";
import cors from 'cors';
import axios from "axios";

const app = express();

// Middleware do parsowania JSON
app.use(express.json());

const allowedOrigins = ['https://endpoint-tester-web-tool.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.options('*', cors());

app.post("/api", async (req: express.Request, res: express.Response) => {
    const { Method, URL, BodyContent } = req.body;

    if (!Method || !URL) {
        return res.status(400).json({ message: 'Method and URL are required' });
    }

    try {
        let response;

        switch (Method) {
            case "GET":
                response = await axios.get(URL);
                break;
            case "POST":
                if (!BodyContent) {
                    return res.status(400).json({ message: 'BodyContent is required for POST requests' });
                }
                response = await axios.post(URL, BodyContent);
                break;
            case "PUT":
                if (!BodyContent) {
                    return res.status(400).json({ message: 'BodyContent is required for PUT requests' });
                }
                response = await axios.put(URL, BodyContent);
                break;
            case "DELETE":
                response = await axios.delete(URL);
                break;
            case "PATCH":
                if (!BodyContent) {
                    return res.status(400).json({ message: 'BodyContent is required for PATCH requests' });
                }
                response = await axios.patch(URL, BodyContent);
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

//For testing

// app.post("/test", async (req: express.Request, res: express.Response) => {
//     const { firstname } = req.body;
//     res.json({ message: `Hello, ${firstname}` });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});