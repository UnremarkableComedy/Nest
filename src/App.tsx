import { useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Shows } from '@/components/Shows';
import { Videos } from '@/components/Videos';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/content';

function App() {
  useEffect(() => {
    document.title = site.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', site.seo.description);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Shows />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
