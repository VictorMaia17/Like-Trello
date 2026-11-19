export default function FormField({
    label,
    type,
    id,
    placeholder,
    value,
    onChange,
    icon = "fa-envelope",
    error,
    disabled = false
    }) {
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

            <div className={`
                flex
                h-12
                items-center
                gap-2
                rounded-[10px]
                border
                bg-white
                px-4
                transition
                focus-within:ring-4
                group
                ${error
                    ? "border-red-500 focus-within:ring-red-500/20"
                    : "border-gray-200 focus-within:border-blue-300 focus-within:ring-blue-300/25"}`}
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
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${id}-erro` : undefined}
                    className="
                        h-full
                        flex-1
                        border-none
                        bg-transparent
                        text-base
                        text-gray-700
                        outline-none
                        placeholder:text-gray-500
                        disabled:opacity-60"
                />
            </div>

            {error && (
                <span id={`${id}-erro`} role="alert" className="text-xs text-red-600">
                    {error}
                </span>
            )}
        </div>
    );
}