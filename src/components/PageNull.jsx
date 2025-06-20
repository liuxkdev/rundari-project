export default function PageNull({ title, text }) {
    return (
            <div className="m-auto min-h-60 flex items-center justify-center flex-col h-full">
                <h3 className="font-poppins text-xl font-semibold text-gray-700 text-center">
                    { title }
                </h3>
                <p className="font-poppins text-sm text-gray-500 w-75 text-center">
                    { text }
                </p>
            </div>
    );
}
