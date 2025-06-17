export default function SubjectCard({ subject, onDelete }) {
    const { id, name, color, teacher } = subject;

    return (
        <div
            className={`p-4 rounded-xl shadow-md flex items-center justify-between gap-4 border-color-${color} border-l-16 bg-white`}
        >
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg font-poppins">
                        {name}
                    </h3>
                </div>
                <div>
                    {teacher && (
                        <p className="text-xs text-gray-600 font-poppins">
                            Docente: {teacher}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <button type="button" onClick={() => onDelete(id)}>
                    <i className="bxr bx-trash text-xl cursor-pointer"></i>
                </button>
            </div>
        </div>
    );
}
