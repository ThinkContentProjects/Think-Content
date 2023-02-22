
import { createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FireBaseUser } from 'firebase/auth';

type userType = {
    currentUser: FireBaseUser | null
    signup: (email: any, password: any) => void
    login: (email: any, password: any) => void
    logout: () => void
  }

type UserContextProviderType = {
    children: React.ReactNode;
}

const AuthContext = createContext<userType>({
    currentUser: null,
    signup: (email: any, password: any) => {},
    login: (email: any, password: any) => {},
    logout: () => {}
  });

export function useAuth() 
{
    return useContext(AuthContext);
}

export function AuthProvider({ children }: UserContextProviderType) 
{
    const [currentUser, setCurrentUser] = useState<FireBaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    function signup(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password);
        return;
    }

    function login(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        signup,
    }

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
}
