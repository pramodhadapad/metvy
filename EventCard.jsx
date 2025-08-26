export default function EventCard({ title, date }){
  const today = new Date().toISOString().slice(0,10);
  const status = date < today ? "Expired" : "Upcoming";
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between">
        <span><strong>{title}</strong> — {date}</span>
        <span className={`badge ${status === 'Expired' ? 'text-bg-secondary' : 'text-bg-success'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}