export default function AbsenceCard({ absence, onDelete }) {
    const { id, type, reason, date, subjectColor, subjectName } = absence;

    return (
        <>
            <div
                key={id}
                className={`bg-white shadow rounded-xl p-4 border-l-8 border-color-${subjectColor} grid grid-cols-4 items-center`}
            >
                <div className="col-span-3">
                    <h3 className="font-semibold font-poppins text-lg">
                        {type}
                    </h3>
                    <p className="text-sm font-poppins text-gray-500">
                        {subjectName} - {new Date(date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-poppins text-gray-700 truncate">
                        Motivo: {reason}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => onDelete(id)}
                    className="justify-self-end"
                >
                    <i className="bxr bx-trash text-xl cursor-pointer"></i>
                </button>
            </div>
        </>
    );
}
