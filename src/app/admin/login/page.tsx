"use client"
import LoginCard from "@/components/admin/LoginCard";
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-storage-complete';
import { useEffect } from 'react';

export default function Home() {
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

      return (
          <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-24">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <LoginCard/>
            </div>
          </main>
      );
}
