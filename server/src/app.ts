import express from "express";
import cors from 'cors';

const app = express();

// Middleware do parsowania JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));

app.post("/api", (req: express.Request, res: express.Response) => {
    const { Method, URL } = req.body; // Odczytaj dane z żądania
    console.log(`Received Method: ${Method}, URL: ${URL}`);

    // Odpowiedź z backendu
    res.json({ message: 'Data received successfully', method: Method, url: URL });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

/* 
WYSYŁAJĄC DELETE NA https://httpbin.org/post DOSTAJEMY RESPONSE 
{message: 'Data received successfully', method: 'DELETE', url: 'https://httpbin.org/post'}
message
: 
"Data received successfully"
method
: 
"DELETE"
url
: 
"https://httpbin.org/post"
[[Prototype]]
: 
Object

A POWINISMY DOSTAC:
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>405 Method Not Allowed</title>
<h1>Method Not Allowed</h1>
<p>The method is not allowed for the requested URL.</p>
*/