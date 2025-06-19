export default function ColorPicker({setIsColorPickerOpen, isColorPickerOpen, setColorSelected }) {
    return (
        <div
            className={`fixed bottom-0 right-0 left-0 bg-white transition-transform
                    duration-300 transform z-60 rounded-t-3xl px-4 py-6 flex flex-col flex-start h-min shadow-[0_-1rem_1rem_#0000001f] max-w-170 m-auto ${
                        isColorPickerOpen ? "translate-y-0" : "translate-y-full"
                    }`}
        >
            <div className="flex justify-center mb-3">
                <button
                    type="button"
                    onClick={() => setIsColorPickerOpen(false)}
                    className="cursor-pointer"
                >
                    <i
                        className={`bxr bx-chevron-up text-3xl transition-[rotate] duration-300 ${
                            isColorPickerOpen ? "rotate-180" : ""
                        }`}
                    ></i>
                </button>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 h-50 gap-2">
                {[
                    "blue",
                    "blue-light",
                    "green",
                    "green-light",
                    "yellow",
                    "red",
                ].map((color) => (
                    <button
                        key={color}
                        type="button"
                        className={`bgcolor-${color} cursor-pointer rounded-xl`}
                        onClick={() => {
                            setColorSelected(color);
                            setIsColorPickerOpen(false);
                        }}
                    ></button>
                ))}
            </div>
        </div>
    );
}
