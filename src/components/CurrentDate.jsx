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

    return (
        <p className="text-sm font-poppins text-gray-600">
            {capitalized}
        </p>
    );
}

export default CurrentDate;
