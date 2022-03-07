import { createContext, useContext  } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth';

interface UserContext {
  authUser : any,
  loading : boolean
}

const authUserContext = createContext<UserContext>({
  authUser: null,
  loading: true
});

 export function AuthUserProvider(props: { children: any; }){
  const auth = useFirebaseAuth();
  const { children } = props;
  return (
    <authUserContext.Provider value={auth}>
      {children}
    </authUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);