export default function SubjectCard({ subject, onDelete }) {
    const { id, name, color, teacher } = subject;

    return (
        <div
            className={`p-4 rounded-xl shadow-md gap-4 border-color-${color} border-l-16 bg-white`}
        >
            <div className="flex justify-between items-start gap-4">
                <h3 className="font-semibold text-lg font-poppins truncate">
                    {name}
                </h3>
                <button type="button" onClick={() => onDelete(id)}>
                    <i className="bxr bx-trash text-xl cursor-pointer"></i>
                </button>
            </div>
            <div>
                {teacher && (
                    <p className="text-xs text-gray-600 font-poppins truncate">
                        Prof. {teacher}
                    </p>
                )}
            </div>
        </div>
    );
}
