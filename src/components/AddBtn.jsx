export default function AddBtn({ toggleFormOpen}) {
    return (
        <>
            <button className="fixed bottom-6 right-6 bg-blue rounded-full p-2 flex cursor-pointer" onClick={ toggleFormOpen }>
                <i className="bxr bx-plus text-3xl text-white"></i>
            </button>
        </>
    );
}
