import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Page = 'beranda' | 'tentang' | 'project' | 'volunteer' | 'donasi' | 'kontak';

interface RouterContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('beranda');

  useEffect(() => {
    const hash = window.location.hash.slice(1) as Page;
    if (hash && ['beranda', 'tentang', 'project', 'volunteer', 'donasi', 'kontak'].includes(hash)) {
      setCurrentPage(hash);
    }
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}