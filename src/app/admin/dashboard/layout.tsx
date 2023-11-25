import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/admin/sidebar-nav"

export const metadata: Metadata = {
  title: "HUNAU Auth | 设置",
  description: "HUNAU Authenticator 的设置页面。",
}

const sidebarNavItems = [
  {
    title: "总览",
    href: "/admin/dashboard",
  },
  {
    title: "___separator___",
    href: "",
  },
  {
    title: "班级管理",
    href: "/admin/dashboard/students/tags",
  },
  {
    title: "密钥分类",
    href: "/admin/dashboard/students/keyGroup",
  },
  {
    title: "学生数据导入",
    href: "/admin/dashboard/students/upload",
  },
{
    title: "___separator___",
    href: "",
  },
  {
    title: "管理员账户管理",
    href: "/admin/dashboard/account",
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">设置</h2>
          <p className="text-muted-foreground">
            管理 HUNAU Authenticator 的设置。
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
