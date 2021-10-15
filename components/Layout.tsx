import Head from 'next/head';
import Container from '@mui/material/Container';
import Header from 'components/Header';
import Footer from 'components/Footer';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = (props: LayoutProps) => {
  const { children, title = 'cookuya' } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <main style={{ marginTop: '20px' }}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
