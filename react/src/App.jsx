import { useStateContext } from "@contexts/ContextProvider";

const App = ({ children }) => {
    const { notification } = useStateContext();

    const notificationStyles = {
        success: "text-green-800 bg-green-50 border-green-700",
        error: "text-red-800 bg-red-50 border-red-700",
        warning: "text-yellow-800 bg-yellow-50 border-yellow-700"
    };

    return (
        <>
            {children}
            {notification?.message && (
                <div className="fixed top-0 left-0 w-screen flex justify-center p-8" role="alert">
                    <div className={`max-w-full border-2 rounded-lg px-6 py-3 ${notificationStyles[notification.type] || "text-gray-800 bg-gray-50 border-gray-700"}`}>
                        <span className="font-medium">{notification.message}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;

