import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { account, ID } from './appwrite'; // Ensure ID is imported from appwrite
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  email: string;
  password: string;
  password1?: string;
  name?: string;
}

interface AccountDetails {
  $id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: AccountDetails | null;
  loginUser: (userInfo: UserInfo) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: UserInfo) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AccountDetails | null>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo: UserInfo) => {
    setLoading(true);
    try {
      await account.createSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const registerUser = async (userInfo: UserInfo) => {
    setLoading(true);
    try {
      // Ensure that ID.unique() generates a valid user ID
      const userId = ID.unique();
      console.log('Generated userId:', userId); // Add logging to inspect generated ID
      await account.create(userId, userInfo.email, userInfo.password1!, userInfo.name!);
      await account.createSession(userInfo.email, userInfo.password1!);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (error) {
      console.error('Failed to register', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error('Failed to check user status', error);
    } finally {
      setLoading(false);
    }
  };

  const contextData: AuthContextType = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
export default AuthContext;
