import { useState, useEffect } from 'react';
import { getAuth, UserInfo, Auth, signInWithEmailAndPassword } from 'firebase/auth';
import Firebase from '../../config/firebase';

const formatAuthUser = (user: UserInfo) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = async (authState: any) => {
    if(!authState){
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    let formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  }

  useEffect(() => {
    const auth = getAuth(Firebase);
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = (email: string, password: string) =>{
    const auth = getAuth(Firebase);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signOut = () => {
    const auth : Auth = getAuth(Firebase);
    auth.signOut().then(clear);
  }


  return {
    authUser,
    loading,
    signOut,
    signIn
  }

}