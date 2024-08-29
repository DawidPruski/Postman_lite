"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware do parsowania JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));
app.post("/api", (req, res) => {
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
