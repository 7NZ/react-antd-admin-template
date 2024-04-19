import { type ReactNode, createContext, useContext, useReducer, useMemo } from 'react';
import type { MenuRoute } from '@/router';

type Theme = 'light' | 'dark';

type LayoutState = {
  collapse: boolean;
  theme: Theme;
  routes: MenuRoute[];
  routesLoaded: boolean;
};

type LayoutDispath = {
  onToggleCollapse: (collapse: boolean) => void;
  onToggleTheme: () => void;
  setMenuRoutes: (routes: MenuRoute[]) => void;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const LayoutContext = createContext<LayoutState>({} as LayoutState);
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const LayoutDispathContext = createContext<LayoutDispath>({} as LayoutDispath);

const useLayoutData = () => useContext(LayoutContext);
const useLayoutDispath = () => useContext(LayoutDispathContext);

type LayoutActions = {
  type: 'toggleCollapse' | 'toggleTheme' | 'setRoutes';
  payload?: any;
};

const layoutReducer = (state: LayoutState, action: LayoutActions): LayoutState => {
  switch (action.type) {
    case 'toggleCollapse':
      return { ...state, collapse: action.payload };
    case 'toggleTheme':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'setRoutes':
      return { ...state, routes: action.payload!, routesLoaded: true };
    default:
      return state;
  }
};

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(layoutReducer, {
    collapse: false,
    theme: 'light',
    routes: [],
    routesLoaded: false
  });

  const apis = useMemo(() => {
    const onToggleCollapse = (collapse: boolean) => {
      dispatch({ type: 'toggleCollapse', payload: collapse });
    };

    const onToggleTheme = () => {
      dispatch({ type: 'toggleTheme' });
    };

    const setMenuRoutes = (routes: MenuRoute[]) => {
      dispatch({ type: 'setRoutes', payload: routes });
    };

    return {
      onToggleCollapse,
      onToggleTheme,
      setMenuRoutes
    };
  }, []);

  return (
    <LayoutContext.Provider value={state}>
      <LayoutDispathContext.Provider value={apis}>
        {children}
      </LayoutDispathContext.Provider>
    </LayoutContext.Provider>
  );
};

export {
  LayoutProvider,
  useLayoutData,
  useLayoutDispath
};
