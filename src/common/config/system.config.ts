import { THEME_CODES } from '@common/enums';

export const SCConfig = {
  appEnv: 'https://api.elsevier.com/content/search/scopus',
  apiKey: 'a8c29028cca261f6d2e4fe7f618843e3',
  themes: [{ default: true, code: THEME_CODES.LIGHT }, { code: THEME_CODES.DARK }],
  defaultUserPicture: '/assets/images/default-user-picture.png',
};
