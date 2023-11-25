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
                {/* SVG 内容 */}
                <p>{loginStatusContent}</p>
              </Button>
            </Link>
          </div>
        </div>
        <Separator />
      </>
  )
}
