export default function SubjectCard({ subject, onDelete }) {
    const {id, name, color, teacher } = subject;

    return (
        <div
            className={`p-4 rounded-xl shadow-md borderflex items-center gap-4 border-color-${color} border-l-16`}
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl font-poppins">{name}</h3>
                <div>
                    <button type="button" onClick={() => onDelete(id)}>
                        <i className="bxr  bx-trash text-xl"></i>
                    </button>
                </div>
            </div>
            <div>
                {teacher && (
                    <p className="text-sm text-gray-600 font-poppins">
                        Profesor: {teacher}
                    </p>
                )}
            </div>
        </div>
    );
}
