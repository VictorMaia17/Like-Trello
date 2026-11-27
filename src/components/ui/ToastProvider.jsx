
import { useState, useCallback } from "react";
import { ToastContext } from "../../contexts/toastContext";

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "success") => {
        const id = crypto.randomUUID();

        setToasts((currentToasts) => [
            ...currentToasts,
            { id, message, type }
        ]);

        // Automatically removes the toast after 3.5 seconds.
        setTimeout(() => {
            setToasts((currentToasts) =>
                currentToasts.filter((toast) => toast.id !== id)
            );
        }, 3500);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="status"
                        className={`px-4 py-3 rounded-lg shadow-lg text-sm text-white ${
                            toast.type === "error"
                                ? "bg-red-600"
                                : "bg-green-600"
                        }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
