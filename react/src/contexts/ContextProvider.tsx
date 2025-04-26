import { createContext, useContext, useState, ReactNode } from "react";

interface User {
    name: string;
    // [key: string]: unknown;
}

interface Notification {
    message: string;
    type?: 'success' | 'error';
};


interface StateContextType {
    user: User | null;
    token: string | null;
    notification: Notification | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setNotification: (notification: Notification) => void;
}

interface ContextProviderProps {
    children: ReactNode;
}

// const StateContext = createContext<StateContextType>({
//     user: null,
//     token: null,
//     notification: null,
//     setUser: () => {},
//     setToken: () => {},
//     setNotification: () => {}
// })

const StateContext = createContext<StateContextType>({} as StateContextType);

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, _setToken] = useState<string | null>(
      localStorage.getItem("ACCESS_TOKEN")
    );
    const [notification, _setNotification] = useState<Notification | null>(null);

    const setNotification = ({message, type = 'success'}: Notification) => {
        _setNotification({ message, type });
        setTimeout(() => {
            _setNotification(null);
        }, 4000);
    };

    const setToken = (token: string | null) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)