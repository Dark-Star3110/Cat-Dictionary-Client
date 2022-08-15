import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";

interface UserContextProps {
    children: ReactNode;
}

interface UserContextData {
    user: User | undefined;
    getUser: () => void;
}

const UserContextDataInit = {
    user: undefined,
    getUser: () => {},
};

export const UserContext = createContext<UserContextData>(UserContextDataInit);

const UserContextProvider = ({ children }: UserContextProps) => {
    const catApi = "http://localhost:8000";

    const [user, setUser] = useState<User | undefined>(undefined);

    const [loadUser, setLoadUser] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(catApi + "/user", {
                    withCredentials: true,
                });
                if (res.data.success) {
                    const userData = res.data;
                    setUser(userData.data);
                } else {
                    setUser(undefined);
                }
                // console.log(user);
            } catch (error) {
                console.error(error);
                setUser(undefined);
            }
        };

        fetchData();
    }, [loadUser]);

    const userData = {
        user,
        getUser: () => {
            setLoadUser((pre) => !pre);
        },
    };

    return (
        <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    );
};

export default UserContextProvider;
