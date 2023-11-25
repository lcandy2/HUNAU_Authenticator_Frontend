import {SubmitHandler, useForm} from 'react-hook-form';
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
import Link from "next/link";
import {USERS_ADMIN_URL} from "@/config/api";
import {useState} from "react";
import {Loader2} from "lucide-react";

// Schema definition for form validation using zod
const loginSchema = z.object({
  username: z.string().min(1, "用户名不能为空"),
  password: z.string().min(1, "密码不能为空"),
});

export default function LoginCard() {
  // Setup useForm with zodResolver for schema validation
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [buttonLoading, setButtonLoading] = useState(false);

  const { handleSubmit, formState: { errors } } = form;

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    setButtonLoading(true);
    try {
      const response = await fetch(USERS_ADMIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.json();

      if (response.ok && responseBody.code === 200) {
        console.log('Login success:', responseBody);
        // Handle successful login here (e.g., redirect to dashboard or set user context)
        setButtonLoading(false);
      } else if (response.ok && responseBody.code === 401) {
        console.error('Login failed(password wrong):', responseBody.msg);
        setLoginError("用户名或密码错误");
        setButtonLoading(false);
      } else {
        console.error('Login failed:', responseBody.msg);
        setLoginError("登录失败，请稍后重试");
        setButtonLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      setLoginError("API请求失败，请联系管理员。");
      setButtonLoading(false);
    }
  };

  const allErrors = loginError
      ? { ...errors, loginError: { message: loginError } }
      : errors;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>管理员登录</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户名</FormLabel>
                        <FormControl>
                          <Input type="text" id="username" placeholder="请输入用户名..." {...field} />
                        </FormControl>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input type="password" id="password" placeholder="请输入密码..." {...field} />
                        </FormControl>
                      </FormItem>
                  )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                {Object.keys(allErrors).length > 0 && (
                    <div className="p-4 rounded-md bg-red-50">
                      <ul>
                        {Object.entries(allErrors).map(([key, error]) => {
                          if (!error) return null;
                          return (
                              <li key={key} className="text-red-700 text-sm">
                                {error.message}
                              </li>
                          );
                        })}
                      </ul>
                    </div>
                )}
                <Button disabled={buttonLoading} type="submit" className="w-full">
                  {buttonLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {buttonLoading ? '登录中' : '登录'}
                </Button>
                <div className="flex flex-row space-x-1 w-full">
                  <Link href="/sso" className="flex-grow" passHref>
                    <Button className="w-full" variant="secondary">学生登录</Button>
                  </Link>
                  <Link href="/" className="flex-grow" passHref>
                    <Button className="w-full" variant="secondary">返回首页</Button>
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
  );
}
