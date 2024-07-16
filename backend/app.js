import express from "express"
import {route} from "./routes/route.js"
import cors from "cors"

const app = express()

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
)
app.use(express.json());
app.use("/", route)


app.listen(4000, () => {
	console.log(`listening on port 4000`)
})