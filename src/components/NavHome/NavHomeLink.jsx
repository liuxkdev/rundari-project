import { NavLink } from "react-router-dom";

export default function NavHomeLink({ target, text, icon}) {
    return (
        <>
            <NavLink
                to={`${target}`}
                className="bg-logo text-white px-3 py-2 font-poppins text-sm flex items-center rounded-lg"
            >
                <i className={`${icon} text-xl mr-3`}></i>
                <span>{text}</span>
            </NavLink>
        </>
    );
}
