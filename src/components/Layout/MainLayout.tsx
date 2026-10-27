import '../FloatingLaura.css';
import FloatingLauraButton from '../FloatingLauraButton';
import LauraRecommendation from './LauraRecommendation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ToastMessage from './ToastMessage';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="app">
        <Sidebar />
        <section className="app-content bg-home-background">
          {children}
        </section>
      </div>
      <FloatingLauraButton />
      <LauraRecommendation />
      <ToastMessage />
    </>
  );
}

export default MainLayout;
