import { useState, useEffect } from 'react';
import { getAuth, UserInfo } from 'firebase/auth';
import Firebase from '../config/firebase';

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

  return {
    authUser,
    loading
  }

}