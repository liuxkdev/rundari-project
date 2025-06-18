export default function RecentAbsenceCard({ absence }) {
    const { id, type, reason, date, subjectColor, subjectName } = absence;

    return (
        <>
            <article key={id} className="flex">
                <div
                    className={`bgcolor-${subjectColor} h-10 w-10 rounded-full mr-4`}
                ></div>
                <div>
                    <p className="text-base text-gray-700 font-poppins">
                        <span>{type}</span>
                        {" - "}
                        {new Date(date).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <p className="font-poppins text-sm text-gray-500">
                        {subjectName}
                    </p>
                </div>
            </article>
        </>
    );
}
