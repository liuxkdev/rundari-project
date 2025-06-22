
export default function ClassBlock({ classData, onClick }) {

    const { subject, start, end } = classData;


    const startHour = parseInt(start.split(":")[0]);
    const startMin = parseInt(start.split(":")[1]);
    const endHour = parseInt(end.split(":")[0]);
    const endMin = parseInt(end.split(":")[1]);

    const duration = endHour + endMin / 60 - (startHour + startMin / 60);
    const topOffset = (startMin / 60) * 80; // 80px por hora
    const blockHeight = duration * 80;

    return (
        <div
            className={`text-white text-xs absolute left-0 right-0 p-2 rounded-lg shadow z-5 overflow-hidden truncate cursor-pointer bgcolor-${subject.color}`}
            style={{
                top: `${topOffset}px`,
                height: `${blockHeight}px`,
            }}
            onClick={onClick}
        >
            <strong className="truncate">{subject.name}</strong>
        </div>
    );
}
