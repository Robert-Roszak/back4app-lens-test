import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import styles from './MainLayout.module.scss';

type MainLayoutProps = {
  children: JSX.Element;
};

const Component = (props: MainLayoutProps) => (
  <div className={styles.root}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
