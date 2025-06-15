// components/CurrentDate.jsx
function CurrentDate() {
    const now = new Date();

    const formattedDate = now.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    const capitalized =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return <p className="font-poppins font-medium text-lg">{capitalized}</p>;
}

export default CurrentDate;
