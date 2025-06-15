import { NavLink } from "react-router-dom";

export default function NavLinkClient({ target, icon, text, toggleSidebar}) {
    return (
        <NavLink
            to={`${ target }`}
            onClick={ toggleSidebar }
            className={({ isActive }) =>
                `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                    isActive
                        ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                        : ""
                }`
            }
        >
            <i className={`${ icon } text-xl mr-3`}></i>
            <span>{ text }</span>
        </NavLink>
    );
}
