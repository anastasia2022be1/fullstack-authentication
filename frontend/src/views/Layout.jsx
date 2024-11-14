import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        {/* Hier kann ein Navbar oder ein Header eingefügt werden */}
      </header>
      <main>
        <Outlet /> {/* Rendern der untergeordneten Routen */}
      </main>
      <footer>
        {/* Hier kann ein Footer eingefügt werden */}
      </footer>
    </div>
  );
}

export default Layout;
