export default function AddBtn({ toggleFormOpen }) {
    return (
        <button
            onClick={() => {
                console.log("Botón presionado");
                toggleFormOpen();
            }}
            className="fixed bottom-6 right-6 bg-logo rounded-full p-2 flex cursor-pointer z-20"
        >
            <i className="bx bx-plus text-3xl text-white"></i>
        </button>
    );
}
