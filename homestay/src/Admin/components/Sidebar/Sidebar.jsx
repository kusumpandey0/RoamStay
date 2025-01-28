import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { FaPlaceOfWorship } from "react-icons/fa";
import { IoIosMan } from "react-icons/io";
import { LiaHotelSolid } from "react-icons/lia";

const routeArray = [
    {
        path: '/admin',
        name: "Manage Rooms",
        icon: <LiaHotelSolid className={styles.icon} />
    },
    {
        path: '/admin/manageTravelGuides',
        name: "Manage TravelGuides",
        icon: <IoIosMan className={styles.icon} />
    },
    {
        path: '/admin/manageDestinations',
        name: "Manage Destinations",
        icon: <FaPlaceOfWorship className={styles.icon} />
    },
];

export const Sidebar = ({ isOpen }) => {
    return (
        <>
            {isOpen && <div className={`${styles.sidebar_overlay} ${isOpen ? styles.show : ''}`} />}
            <div className={isOpen ? styles.sidebar : styles.mini_sidebar}>
                <div className={styles.sidebar_options}>
                    {routeArray.map((curRoute) => (
                        <NavLink
                            to={curRoute.path}
                            className={({ isActive }) =>
                                `${isOpen ? styles.open_sidebar_option : styles.close_sidebar_option} 
                                ${isActive ? styles.admin_active : ""}`
                            }
                            key={curRoute.name}
                        >
                            <div className={styles.icon_container}>{curRoute.icon}</div>
                            {isOpen && <div className={styles.route_name}>{curRoute.name}</div>}
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};