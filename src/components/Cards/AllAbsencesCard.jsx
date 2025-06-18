import AbsenceCard from "./AbsenceCard";

export default function AllAbsencesCard({recentAbsences, handleDeleteAbsence}) {
    return (
        <article className="lg:col-span-2 xl:col-span-1">
            <header>
                <h3 className="font-semibold text-xl font-poppins">Todas</h3>
            </header>
            <section className="flex flex-col gap-4 mt-4">
                {recentAbsences.length === 0 ? (
                    <p className="text-gray-600 font-poppins">
                        No hay faltas registradas.
                    </p>
                ) : (
                    recentAbsences.map((absence) => (
                        <AbsenceCard
                            key={absence.id}
                            absence={absence}
                            onDelete={handleDeleteAbsence}
                        />
                    ))
                )}
            </section>
        </article>
    );
}
