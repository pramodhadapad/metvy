export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to home
  }

  return (
    <header className="p-3 shadow-sm bg-light">
      <div className="container d-flex justify-content-between">
        <a className="fw-bold text-decoration-none" href="/">CampusHub</a>
        <nav className="d-flex gap-3 align-items-center">
          <a href="/events">Events</a>
          <a href="/forums">Forums</a>
          <a href="/resources">Resources</a>
          <a href="/about">About</a>
          {user ? (
            <>
              <span>Hi, {user.email}</span>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">Logout</button>
            </>
          ) : (
            <a href="/auth" className="btn btn-sm btn-primary">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
}