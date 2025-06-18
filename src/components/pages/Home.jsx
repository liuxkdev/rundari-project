import CurrentDate from "../CurrentDate";
import Clock from "../Clock";
import NavHome from "../NavHome/NavHome";

export default function Home() {
    

    return (
        <>
            <div className="flex flex-col items-center my-6">
                <CurrentDate />
                <Clock />
            </div>
            <NavHome />
        </>
    );
}
