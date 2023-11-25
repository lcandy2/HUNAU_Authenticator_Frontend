"use client"
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-storage-complete';
import { useEffect } from 'react';

export default function AdminPage() {
  const [isLoggedIn] = useLocalStorage('isLoggedIn', false);
  const router = useRouter();

  useEffect(() => {
    // Perform the redirection based on the login status
    if (isLoggedIn) {
      router.push('/admin/dashboard'); // Redirect to /admin/dashboard if logged in
    } else {
      router.push('/admin/login'); // Redirect to /admin/login if not logged in
    }
  }, [isLoggedIn, router]);

  // Return null or a loading indicator while redirection is in progress
  return null;
}
