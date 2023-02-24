import { createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FireBaseUser,
signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

type userType = {
    currentUser: FireBaseUser | null
    signup: (email: string, password: string) => void
    login: (email: string, password: string) => void
    loginWithGoogle: () => void
    logout: () => void
  }

type UserContextProviderType = {
    children: React.ReactNode;
}

const AuthContext = createContext<userType>({
    currentUser: null,
    signup: (email: string, password: string) => {},
    login: (email: string, password: string) => {},
    loginWithGoogle: () => {},
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

    const googleAuth = new GoogleAuthProvider();

    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
        
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function loginWithGoogle() {
        return signInWithPopup(auth, googleAuth);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        loginWithGoogle,
        logout,
        signup,
    }

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
}
