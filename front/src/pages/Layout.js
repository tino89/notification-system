import { Link, Outlet } from "react-router-dom";
import Container from '@mui/material/Container';


export default function Layout() {
  return (<div className="container">

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/send">Send Notification </Link></li>
            <li className="nav-item"><Link className="nav-link" to="/list">List Notification </Link></li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="row">
      <Outlet></Outlet>
    </div>
  </div>
  );
}


