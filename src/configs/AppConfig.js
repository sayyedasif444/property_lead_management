import { env } from './EnvironmentConfig';

export const APP_NAME = 'Emilus';
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';

export const THEME_CONFIG = {
  navType: 'SIDE',
  sideNavTheme: 'SIDE_NAV_DARK',
  navCollapsed: false,
  topNavColor: '#1245A8',
  headerNavColor: 'rgb(18, 69, 168)',
  locale: 'en',
  currentTheme: 'light',
  direction: 'ltr',
};
