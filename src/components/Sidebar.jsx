import '../styles/Sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  Category
} from '@mui/icons-material';
const Sidebar = () => {

  const location = useLocation();

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  const sideData = [
    {
      title: "Quick Menu",
      items: [
        { path: "/", label: "Home", icon: <LineStyle className="sidebarIcon" /> },
        { path: "/users", label: "Users", icon: <PermIdentity className="sidebarIcon" /> },
        { path: "/products", label: "Products", icon: <Storefront className="sidebarIcon" /> },
        { path: "/categories", label: "Categories", icon: <Category className="sidebarIcon" /> },
        { path: "/transactions", label: "Transactions", icon: <AttachMoney className="sidebarIcon" /> }
      ]
    },
    {
      title: "Create Data",
      items: [
        { path: "/newuser", label: "Add user", icon: <PermIdentity className="sidebarIcon" /> },
        { path: "/newproduct", label: "Add product", icon: <Storefront className="sidebarIcon" /> },
        { path: "/newCategory", label: "Add Category", icon: <Storefront className="sidebarIcon" /> }
      ]
    }
  ];


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {
          sideData.map((section, index) => (
            <div className="sidebarMenu" key={index}>
              <h3 className="sidebarTitle side-label">{section.title}</h3>
              <ul className="sidebarList">
                {
                  section.items.map((item, idx) => (
                    <Link to={item.path} className="link" key={idx} title={item.label}>
                      <li className={`sidebarListItem ${isActiveLink(item.path) ? "active" : ""}`}>
                        {item.icon}
                       <span className='side-label'>{item.label}</span> 
                      </li>
                    </Link>
                  ))
                }
              </ul>
            </div>
          ))
        }

      </div>
    </div>)
}

export default Sidebar