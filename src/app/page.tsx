"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from "next/link";
import {useEffect, useState} from "react";
import {useLocalStorage} from "react-storage-complete";
import {
  USER_ALLOCATE_URL,
  USER_AVAILABLEKEYSGROUP_URL,
  USERS_CHECKADMINALIVE_URL,
  USERS_CHECKUSERALIVE_URL
} from "@/config/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const formSchema = z.object({
  stuId: z.string().regex(/^20\d+$/, { message: "请检查学号是否存在错误。" }).min(12, { message: "请检查学号是否存在错误。" }),
});

export default function Home() {
  const [loggedIn, setLoggedIn] = useLocalStorage('stuLoggedIn', false);
  const [stuId, setStuId] = useLocalStorage('stuId', '');
  const [stuName, setStuName] = useLocalStorage('stuName', '');
  const [userData, setUserData] = useState(null); // 用于存储用户数据

  useEffect(() => {
    fetch(USERS_CHECKUSERALIVE_URL)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        setStuId(data.data.schId);
        setStuName(data.data.username);
        setUserData(data.data); // 存储用户数据以在页面上显示
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
    .catch(error => console.error('Error:', error));
  }, []);

  const [keyGroups, setKeyGroups] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      fetch(USER_AVAILABLEKEYSGROUP_URL)
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          setKeyGroups(data.data);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }, [loggedIn]);

  const handleSubmit = () => {
    if (loggedIn) {
      fetch(USER_ALLOCATE_URL+'/0')
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          alert('密钥获取成功：'+data.data);
        } else if (data.code === 201) {
          alert('密钥已被获取。');
        } else {
          alert('获取失败：' + data.msg);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }

  return (
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-24">
        <div className="w-full md:w-1/2 lg:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>获取验证密钥</CardTitle>
                  {/*<CardDescription>在线获取阿里云认证验证码</CardDescription>*/}
                </CardHeader>
                <CardContent>
                  {userData ? (
                      <div>
                        <p>学号: {userData.schId}</p>
                        <p>姓名: {userData.username}</p>
                        {keyGroups.length > 0 && (
                            <Table>
                              <TableCaption>可用的密钥分类</TableCaption>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>密钥分类</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {keyGroups.map(group => (
                                    <TableRow key={group.id}>
                                      <TableCell>{group.identityName}</TableCell>
                                    </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        )}
                      </div>
                  ) : (
                        <Link href="/sso">
                          <Button className="w-full">登录</Button>
                        </Link>
                    )}
                </CardContent>
                <CardFooter>
                  {userData && (<Button onClick={() => {
                    handleSubmit()
                  }} className="w-full">查询</Button>)}
                </CardFooter>
              </Card>
        </div>
      </main>
  );
}
