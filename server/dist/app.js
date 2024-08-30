"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
// Middleware do parsowania JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));
app.post("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Method, URL } = req.body; // Odczytaj dane z żądania
    console.log(`Received Method: ${Method}, URL: ${URL}`);
    try {
        let response;
        switch (Method) {
            case "GET":
                response = yield axios_1.default.get(URL);
                break;
            case "POST":
                response = yield axios_1.default.post(URL, req.body.data);
                break;
            case "PUT":
                response = yield axios_1.default.put(URL, req.body.data);
                break;
            case "DELETE":
                response = yield axios_1.default.delete(URL);
                break;
            case "PATCH":
                response = yield axios_1.default.patch(URL, req.body.data);
                break;
            default:
                return res.status(400).json({ message: 'Invalid method' });
        }
        res.json(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}));
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
