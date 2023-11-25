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

const formSchema = z.object({
  stuId: z.string().regex(/^20\d+$/, { message: "请检查学号是否存在错误。" }).min(12, { message: "请检查学号是否存在错误。" }),
});

export default function Home() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stuId: "",
    },
  });

  function onSubmit(values: any) {
    console.log(values);
    // Handle form submission
  }

  return (
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-24">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>获取验证码</CardTitle>
                  <CardDescription>在线获取阿里云认证验证码</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="stuId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>学号</FormLabel>
                        <FormControl>
                          <Input type="text" id="stuId" placeholder="请在此输入学号..." {...field} />
                        </FormControl>
                        <FormDescription>请输入你的学号来获取验证信息。</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">查询</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </main>
  );
}
