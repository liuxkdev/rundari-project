export default function AbsenceCard({ absence, onDelete}) {
    const { id, type, reason, date } = absence;

    return (
        <>
            <div
                key={id}
                className="bg-white shadow rounded-xl p-4 border-l-4 border-blue flex justify-between items-center"
            >
                <div>
                    <h3 className="font-semibold font-poppins text-lg">
                        {type}
                    </h3>
                    <p className="text-sm font-poppins text-gray-700">
                        Motivo: {reason}
                    </p>
                    <p className="text-sm font-poppins text-gray-500 mt-1">
                        Fecha: {new Date(date).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <button type="button" onClick={() => onDelete(id)}>
                        <i className="bxr bx-trash text-xl cursor-pointer"></i>
                    </button>
                </div>
            </div>
        </>
    );
}
