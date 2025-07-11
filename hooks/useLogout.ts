'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.clear(); 
    router.push('/Login'); 
  }, [router]);

  return logout;
};

export default useLogout;
