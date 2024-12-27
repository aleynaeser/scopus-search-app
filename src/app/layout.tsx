import { Metadata } from 'next';
import { nunitoFont } from '@fonts/nunito-font';
import { ReactQueryProvider } from '@common/providers';
import appConfig from '@root/app.config.json';

import '@common/sass/style.scss';

interface ILocaleLayout {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: appConfig.title,
};

export default async function LocaleLayout({ children }: ILocaleLayout) {
  return (
    <html lang='en' className={nunitoFont.variable}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <link rel='apple-touch-icon' sizes='180x180' href='/assets/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/assets/favicons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/assets/favicons/favicon-16x16.png' />
        <link rel='manifest' href='/assets/favicons/site.webmanifest' />
        <link rel='mask-icon' href='/assets/favicons/safari-pinned-tab.svg' color='#F6F6F6' />
        <link rel='shortcut icon' href='/assets/favicons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#F8F8F8' />
        <meta name='msapplication-config' content='/assets/favicons/browserconfig.xml' />
        <meta name='theme-color' content='#F8F8F8' />
      </head>
      <body>
        <ReactQueryProvider>
          <div id='app-layout'>{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
