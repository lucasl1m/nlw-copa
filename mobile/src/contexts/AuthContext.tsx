import { createContext, ReactNode, useState, useEffect } from "react";
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
        expoClientId: "425449605614-ak2si8cdfb4sfr38bhghfubjvriui7bo.apps.googleusercontent.com",
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

    async function signInWithGoogle(acess_token: string) {
        console.log(acess_token);
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
