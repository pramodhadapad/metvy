import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function Resources(){
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // Fetch resources
  useEffect(() => {
    api.get("/api/resources").then(res => setResources(res.data));
  }, []);

  // Add new resource
  async function onSubmit(e){
    e.preventDefault();
    const { data } = await api.post("/api/resources", { title, url });
    setResources(prev => [data, ...prev]);
    setTitle(""); setUrl("");
  }

  return (
    <div className="container py-3">
      <h2 className="h4 mb-3">Resources</h2>
      <form onSubmit={onSubmit} className="mb-3">
        <input className="form-control mb-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <input className="form-control mb-2" value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL" required />
        <button className="btn btn-primary">Add Resource</button>
      </form>
      <ul className="list-group">
        {resources.map(r => (
          <li key={r.id} className="list-group-item">
            <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}