import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function Forums(){
  const [forums, setForums] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Fetch forums from backend
  useEffect(() => {
    api.get("/api/forums").then(res => setForums(res.data));
  }, []);

  // Add new forum post
  async function onSubmit(e){
    e.preventDefault();
    const { data } = await api.post("/api/forums", { title, body });
    setForums(prev => [data, ...prev]); // update UI
    setTitle(""); setBody("");
  }

  return (
    <div className="container py-3">
      <h2 className="h4 mb-3">Forums</h2>
      <form onSubmit={onSubmit} className="mb-3">
        <input className="form-control mb-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <textarea className="form-control mb-2" value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" required />
        <button className="btn btn-primary">Post</button>
      </form>
      <ul className="list-group">
        {forums.map(f => (
          <li key={f.id} className="list-group-item">
            <strong>{f.title}</strong><br />{f.body}
          </li>
        ))}
      </ul>
    </div>
  );
}