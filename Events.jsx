import { useEffect } from "react";
import EventCard from "../components/EventCard";
import useEvents from "../hooks/useEvents";
import { api } from "../lib/api";

export default function Events(){
  const { events, setEvents } = useEvents([]);

  // Fetch events from backend
  useEffect(() => {
    api.get("/api/events").then(res => setEvents(res.data));
  }, [setEvents]);

  // Add new event
  async function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title").trim();
    const date = form.get("date");
    if(!title || !date) return;

    const { data } = await api.post("/api/events", { title, date });
    setEvents(prev => [data, ...prev]);  // update UI
    e.currentTarget.reset();
  }

  return (
    <div className="container py-3">
      <h2 className="h4 mb-3">Events</h2>
      <form onSubmit={onSubmit} className="row g-2 mb-3">
        <div className="col-sm-5"><input name="title" className="form-control" placeholder="Title" required /></div>
        <div className="col-sm-4"><input name="date" type="date" className="form-control" required /></div>
        <div className="col-sm-3 d-grid"><button className="btn btn-primary">Add</button></div>
      </form>
      {events.map(e => <EventCard key={e.id} title={e.title} date={e.date} />)}
    </div>
  );
}