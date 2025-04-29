import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { EUnauthenticatedPath } from '@/core/router';

import {
  EAuthAction,
  IAuth,
  IAuthAction,
  IUseAuth,
  LoginRequestDTO,
  LoginResponseDTO
} from '../domain';
import { AuthRepository } from '../repositories';
export const AuthContext = createContext<IUseAuth>({} as IUseAuth);

function authReducer(state: IAuth, action: IAuthAction) {
  const { type, user } = action;

  const states = {
    [EAuthAction.LOGIN]: {
      ...state,
      authenticated: true,
      user: user,
    },
    [EAuthAction.LOGOUT]: {
      ...state,
      authenticated: false,
      user: null,
    },
  };

  return states[type] as IAuth;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const repository = new AuthRepository();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);

  const [_auth, setLocalStorage, clearLocalStorage] =
    useLocalStorage<LoginResponseDTO>('@omega/auth', {
      token: '',
      refreshToken: '',
    });

  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    user: null,
  } as IAuth);

  async function checkAuthentication() {
    if (state.authenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const user = await repository.check();

      dispatch({ type: EAuthAction.LOGIN, user });

      navigate(location ?? '/');
    } catch {
      dispatch({ type: EAuthAction.LOGOUT });
      clearLocalStorage();
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginRequestDTO) {
    try {
      setLoading(true);

      const { token, refreshToken } =
        await repository.login(data);

      setLocalStorage({
        token,
        refreshToken: refreshToken,
      });

      const user = await repository.check();

      dispatch({ type: EAuthAction.LOGIN, user });

      navigate(location ?? '/', {
        state: {
          origin: 'login',
          loggedIn: true,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    dispatch({ type: EAuthAction.LOGOUT });
    clearLocalStorage();

    navigate(EUnauthenticatedPath.LOGIN);

    setLoading(false);
  }

  async function refreshUser() {
    const user = await repository.check();

    dispatch({ type: EAuthAction.LOGIN, user });
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (state.authenticated) {
      setLoading(false);
    }
  }, [state]);

  const value = useMemo(() => {

    return {
      login,
      logout,
      loading,
      refreshUser,
      confirm,
      ...state,
    };
  }, [loading, state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
