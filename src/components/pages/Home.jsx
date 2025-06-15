import CurrentDate from "../CurrentDate";
import Clock from "../Clock";
import NavHome from "../NavHome/NavHome";

export default function Home() {
    return (
        <>
            <div className="m-8 flex flex-col items-center">
                <CurrentDate />
                <Clock />
            </div>
            <NavHome />
        </>
    );
}
