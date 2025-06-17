export default function AbsenceCard({ absence }) {
    const {id, type, reason, date} = absence

    return (
        <>
            <div
                key={id}
                className="bg-white shadow rounded-xl p-4 border-l-4 border-blue"
            >
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
        </>
    );
}
