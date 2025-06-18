import RecentAbsence from "./RecentAbsence";

export default function RecentAbsencesCard({ absences, handleDeleteAbsence }) {
    const recentAbsences = [...absences]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    return (
        <section className="bg-white p-4 rounded-2xl shadow-md h-min">
            <header className="mb-4">
                <h3 className="font-semibold text-xl font-poppins">
                    Recientes
                </h3>
            </header>
            <div className="flex flex-col gap-4">
                {recentAbsences.length === 0 ? (
                    <p className="text-gray-600 font-poppins">
                        No hay faltas registradas.
                    </p>
                ) : (
                    recentAbsences.map((absence) => (
                        <RecentAbsence
                            key={absence.id}
                            absence={absence}
                            onDelete={handleDeleteAbsence}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
