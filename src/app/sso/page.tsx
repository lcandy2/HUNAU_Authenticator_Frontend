// page.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const LoginPage = () => {
  const handleLogin = (event: any) => {
    event.preventDefault();
    // Perform login logic here
  };

  return (
    // Removed vertical centering and added padding at the top
    <div className='flex flex-col min-h-screen bg-hunau_bg px-4 sm:px-8 pt-8'>
      <div className="w-full max-w-5xl mx-auto"> {/* Centering horizontally and max width */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4"> {/* Stack on mobile, row on desktop */}
          <Image
            src="/sso/hunau-logo.png"
            alt="Hunan Agricultural University Logo"
            width={265}
            height={60}
            className="mb-4 sm:mb-0" // Margin bottom on mobile only
          />
          <p className="font-semibold text-lg text-center sm:text-left text-white text-base font-normal">统一身份认证中心</p>
        </div>
        <div className="flex justify-center mt-6"> {/* Added margin top */}
          {/* Hide the following Image on mobile */}
          <div className="hidden sm:block">
            <Image
              src="/sso/background-building.png"
              alt="Hunan Agricultural University"
              width={700}
              height={475}
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/3 items-center pt-12 bg-white px-4 sm:px-8">
            <div className="w-full max-w-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-600">密码登录</p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div>
                  <input
                    type="text"
                    name="username"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="请输入邮箱/手机号/学工号"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="请输入密码"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    登录
                  </button>
                  <Link href="/">
                  <button
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    返回首页
                  </button>
                  </Link>
                </div>
              </form>
              {/* <div className="text-center">
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500" style={{ fontSize: '12px' }}>
                  忘记密码？
                </a>
              </div>
              <div className="text-center mt-6">
                <span className="inline-block rounded-md bg-transparent text-teal-600 font-medium hover:text-teal-500 cursor-pointer">
                  更多登录方式
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
