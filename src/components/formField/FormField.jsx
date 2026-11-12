export default function FormField({label, type, id, placeholder, icon = "fa-envelope"}) {
    return (
        <div className="
            flex
            w-full
            flex-col
            gap-1"
        >

            <label
                htmlFor={id}
                className="text-[15px] font-medium text-gray-900 mt-2"
            >
                {label}
            </label>

            <div className="
                flex
                h-12
                items-center
                gap-2
                rounded-[10px]
                border
                border-gray-200
                bg-white
                px-4
                transition
                focus-within:border-blue-300
                focus-within:ring-4
                focus-within:ring-blue-300/25
                group"
            >

                <i className={`
                    fas
                    ${icon}
                    text-base
                    text-slate-300
                    transition-colors
                    group-focus-within:text-slate-400`}
                    aria-hidden="true"
                ></i>
                
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className="
                        h-full
                        flex-1
                        border-none
                        bg-transparent
                        text-base
                        text-gray-700
                        outline-none
                        placeholder:text-gray-500"
                />
            </div>
        </div>
    );
}