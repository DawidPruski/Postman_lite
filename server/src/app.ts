import express from "express";
import { ApiSender } from './controllers/sender';


const app = express();

app.get("/api", (req: express.Request, res: express.Response) => {
    res.json({ fruits: ["apple", "orange", "bannana"]})
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});