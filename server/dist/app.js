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
// Middleware to parse JSON
app.use(express_1.default.json());
const allowedOrigins = ['https://endpoint-tester-web-tool.vercel.app', 'http://localhost:5173'];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.options('*', (0, cors_1.default)());
app.post("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Method, URL, BodyContent } = req.body;
    if (!Method || !URL) {
        return res.status(400).json({ message: 'Method and URL are required' });
    }
    try {
        let response;
        switch (Method) {
            case "GET":
                response = yield axios_1.default.get(URL);
                break;
            case "POST":
                if (!BodyContent) {
                    return res.status(400).json({ message: 'BodyContent is required for POST requests' });
                }
                response = yield axios_1.default.post(URL, BodyContent);
                break;
            case "PUT":
                if (!BodyContent) {
                    return res.status(400).json({ message: 'BodyContent is required for PUT requests' });
                }
                response = yield axios_1.default.put(URL, BodyContent);
                break;
            case "DELETE":
                response = yield axios_1.default.delete(URL);
                break;
            case "PATCH":
                if (!BodyContent) {
                    return res.status(400).json({ message: 'BodyContent is required for PATCH requests' });
                }
                response = yield axios_1.default.patch(URL, BodyContent);
                break;
            default:
                return res.status(400).json({ message: 'Invalid method' });
        }
        res.status(200).json(response.data);
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
//For testing
// app.post("/test", async (req: express.Request, res: express.Response) => {
//     const { firstname } = req.body;
//     res.json({ message: `Hello, ${firstname}` });
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
