export default function SubjectCard({ subject }) {
    const { name, color, teacher } = subject;

    return (
        <div className="p-4 rounded-xl shadow-md border border-gray-200 flex items-center gap-4">
            <div
                className={`w-6 h-6 rounded-full bg-${color}`}
                title={color}
            ></div>
            <div>
                <h3 className="font-semibold text-lg font-poppins">{name}</h3>
                {teacher && (
                    <p className="text-sm text-gray-600 font-poppins">
                        Profesor: {teacher}
                    </p>
                )}
            </div>
        </div>
    );
}

