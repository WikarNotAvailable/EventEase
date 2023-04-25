import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = ({ children }: any) => {
  const location = useLocation();

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [location]);
  return <>{children}</>;
};
