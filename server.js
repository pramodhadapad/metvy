import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dummy Data
let events = [
  { id: 1, title: "Hackathon", date: "2025-08-20" },
  { id: 2, title: "Tech Talk", date: "2025-08-10" }
];

let forums = [
  { id: 1, title: "Welcome", body: "Introduce yourself here!" }
];

let resources = [
  { id: 1, title: "DSA Notes", url: "https://example.com/dsa.pdf" }
];

// Events Routes
app.get("/api/events", (req, res) => res.json(events));
app.post("/api/events", (req, res) => {
  const { title, date } = req.body;
  const newEvent = { id: Date.now(), title, date };
  events.unshift(newEvent);
  res.status(201).json(newEvent);
});
app.put("/api/events/:id", (req, res) => {
  const { id } = req.params;
  const index = events.findIndex(e => e.id == id);
  if(index === -1) return res.status(404).json({ error: "Event not found" });
  events[index] = { ...events[index], ...req.body };
  res.json(events[index]);
});
app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  const before = events.length;
  events = events.filter(e => e.id != id);
  if(events.length === before) return res.status(404).json({ error: "Event not found" });
  res.json({ ok: true });
});

// Forums Routes
app.get("/api/forums", (_, res) => res.json(forums));
app.post("/api/forums", (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: Date.now(), title, body };
  forums.unshift(newPost);
  res.status(201).json(newPost);
});

// Resources Routes
app.get("/api/resources", (_, res) => res.json(resources));
app.post("/api/resources", (req, res) => {
  const { title, url } = req.body;
  const newResource = { id: Date.now(), title, url };
  resources.unshift(newResource);
  res.status(201).json(newResource);
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));

let users = [];

app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  if (users.some(u => u.email === email)) return res.status(400).json({ error: "User exists" });
  const user = { id: Date.now(), email, password };
  users.push(user);
  res.status(201).json({ ok: true });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ token: "demo-token", user: { id: user.id, email: user.email } });
});