import express from "express";
import cors from "cors";
import { getAllEvents } from "./index.mjs";
import { getAtendees } from "./index.mjs";
import { getAtendeeByName } from "./index.mjs";
import { addEvent } from "./index.mjs";
import axios from "axios";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.get("/", (req, res, next) => {
  res.send({ info: "Welcome!" });

  next();
});
app.get("/api/events", async (req, res, next) => {
  res.json({ data: await getAllEvents() });

  next();
});

app.get(`/api/attendees/:id`, async (req, res, next) => {
  res.json({ data: await getAtendeeByName(req.params.id) });

  next();
});

app.get("/api/attendees", async (req, res, next) => {
  res.send({ data: await getAtendees() });
  next();
});

app.post("/api/avents", async (req, res, next) => {
  let name = "test1";
  let author = "test1";
  let description = "test1";
  res.send(addEvent(name, author, description));
});

app.listen(PORT, () => console.log(`server started on port ${PORT} `));
