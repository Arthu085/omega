/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useReducer, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { EUnauthenticatedPath } from '@/core/router';

import {
  IAuth,
  IUseAuth,
  IAuthAction,
  EAuthAction,
  LoginResponseDTO,
  LoginRequestDTO,
  RecoverRequestDTO,
  ResetRequestDTO,
} from '../domain';
import { AuthRepository } from '../repositories';

interface Props {
  children: ReactNode;
}

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

export function AuthProvider({ children }: Props) {
  const repository = new AuthRepository();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);

  const [_auth, setLocalStorage, clearLocalStorage] = useLocalStorage<LoginResponseDTO>(
    '@omega/auth',
    { token: '' },
  );

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
      localStorage.removeItem('email');
      clearLocalStorage();
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginRequestDTO) {
    try {
      setLoading(true);

      const auth = await repository.login(data);

      setLocalStorage(auth);

      const user = await repository.check()

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
    localStorage.removeItem('email');
    clearLocalStorage();

    navigate(EUnauthenticatedPath.LOGIN);

    setLoading(false);
  }

  async function recover(data: RecoverRequestDTO) {
    try {
      setLoading(true);

      const message = await repository.recover(data);

      return message;
    } finally {
      setLoading(false);
    }
  }

  async function reset(data: ResetRequestDTO) {
    try {
      setLoading(true);

      const message = await repository.reset(data);

      return message;
    } finally {
      setLoading(false);
    }
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

  const value = useMemo(
    () => ({
      login,
      logout,
      recover,
      reset,
      loading,
      confirm,
      refreshUser,
      ...state,
    }),
    [loading, state],
  );

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}
