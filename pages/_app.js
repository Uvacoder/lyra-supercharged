import "../styles/globals.css";
import "../styles/nprogress.css";

import { Head } from "../components/head";
import { MainLayout } from "../components/layouts";
import { UIProvider } from "../lib/contexts/ui-context";

export default function LyraSupercharged({ Component, pageProps }) {
  const Layout = Component.Layout || (({ children }) => <MainLayout>{children}</MainLayout>);

  return (
    <>
      <Head />
      <UIProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </>
  );
}
