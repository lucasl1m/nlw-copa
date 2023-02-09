import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../service/api";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatar_url: string;
}

export interface AuthContextProps {
    user: UserProps;
    userLoading: boolean;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState({} as UserProps);
    const [userLoading, setUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: process.env.EXPO_CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ["profile", "email"],
    })

    async function signIn() {
        try {
            setUserLoading(true);
            await promptAsync();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        try {
            setUserLoading(true);
            const response = await api.post("/users", {
                access_token,
            });

            api.defaults.headers.authorization = `Bearer ${response.data.token}`;

            const userInfoResponse = await api.get("/me");

            setUser(userInfoResponse.data.user);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setUserLoading(false);
        }
    }

    useEffect(() => {
        if (response?.type === "success" && response?.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response]);

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                userLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
