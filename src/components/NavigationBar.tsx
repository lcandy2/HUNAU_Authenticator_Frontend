"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocalStorage } from 'react-storage-complete';
import { useEffect, useState } from "react";
import { USERS_CHECKADMINALIVE_URL } from "@/config/api";

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);

    const checkAdminAlive = async () => {
      try {
        const response = await fetch(USERS_CHECKADMINALIVE_URL);
        const responseBody = await response.json();

        if (responseBody.code === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsLoggedIn(false);
      }
    };

    checkAdminAlive();
  }, []);

  const loginStatusContent = isClientSide ? (isLoggedIn ? "Logged In" : "Logged Out") : "Loading...";

  return (
      <>
        <div className="container flex flex-col items-start justify-between py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <Link href="/">
            <h2 className="text-lg font-semibold whitespace-nowrap">HUNAU Authenticator</h2>
          </Link>
          <div className="ml-auto flex items-center space-x-2 sm:justify-end">
            <Link href="/admin">
              <Button variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className="h-4 w-4" focusable="false">
                  <path d="M768 1024q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-117 35-229t101-207 157-169 203-113q-56-36-100-83t-76-103-47-118-17-130q0-106 40-199t109-163T568 40 768 0q106 0 199 40t163 109 110 163 40 200q0 67-16 129t-48 119-75 103-101 83q69 26 132 64t117 89l-87 95q-89-82-201-126t-233-44zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1530 1027q6 30 6 61t-6 61l124 51-49 119-124-52q-35 51-86 86l52 124-119 49-51-124q-30 6-61 6t-61-6l-51 124-119-49 52-124q-51-35-86-86l-124 52-49-119 124-51q-6-30-6-61t6-61l-124-51 49-119 124 52q35-51 86-86l-52-124 119-49 51 124q30-6 61-6t-61 6l51-124 119 49-52 124q51 35 86 86l124-52 49 119-124 51zm-314 253q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15z"></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
        <Separator />
      </>
  )
}
