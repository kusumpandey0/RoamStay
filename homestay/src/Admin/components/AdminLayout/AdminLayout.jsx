import { Outlet } from "react-router-dom"
import { Sidebar } from '../Sidebar/Sidebar'
import { Navbar } from "../Navbar/Navbar"
import styles from './AdminLayout.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.admin_container}>
            <ToastContainer />
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`${styles.inner_container} ${!isOpen ? styles.collapsed : ''}`}>
                <Navbar handleMenuToggle={handleMenuToggle} />
                <Outlet />
            </div>
        </div>
    )
}