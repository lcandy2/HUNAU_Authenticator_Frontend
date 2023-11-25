"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import {useEffect, useState} from "react";
import {USERS_KEYGROUP_URL, USERS_USERGROUP_URL} from "@/config/api";

const FormSchema = z.object({
  keyGroup: z.string({
    required_error: "请选择一个密钥分类。",
  }),
  userGroup: z.string({
    required_error: "请选择一个班级分类。",
  }),
})

export function ImportForm() {
  const [identityOptions, setIdentityOptions] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    fetch(USERS_KEYGROUP_URL)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        const options = data.data.map(item => ({
          label: item.identityName,
          value: item.keyIdentity.toString(),
        }));
        setIdentityOptions(options);
      }
    })
    .catch(error => {
      console.error('Error fetching identities:', error);
    });


    // 获取用户组数据
    fetch(USERS_USERGROUP_URL)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        const groups = data.data.map(item => ({
          label: item.tag,
          value: item.id.toString(),
        }));
        setUserGroups(groups);
      }
    })
    .catch(error => {
      console.error('Error fetching user groups:', error);
    });
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
              control={form.control}
              name="keyGroup"
              render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>密钥分类</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                              )}
                          >
                            {field.value
                                ? identityOptions.find(
                                    (identityOptions) => identityOptions.value === field.value
                                )?.label
                                : "选择分类"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="搜索密钥分类..." />
                          <CommandEmpty>没有找到分类。</CommandEmpty>
                          <CommandGroup>
                            {identityOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => form.setValue("keyGroup", option.value)}
                                >
                                  <Check
                                      className={cn(
                                          "mr-2 h-4 w-4",
                                          option.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                      )}
                                  />
                                  {option.label}
                                </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      你的密钥将上传到此分类中。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="userGroup"
              render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>班级分类</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                              )}
                          >
                            {field.value
                                ? userGroups.find(
                                    (userGroups) => userGroups.value === field.value
                                )?.label
                                : "选择分类"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="搜索密钥分类..." />
                          <CommandEmpty>没有找到分类。</CommandEmpty>
                          <CommandGroup>
                            {userGroups.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => form.setValue("userGroup", option.value)}
                                >
                                  <Check
                                      className={cn(
                                          "mr-2 h-4 w-4",
                                          option.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                      )}
                                  />
                                  {option.label}
                                </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      你的密钥将上传到此班级中。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )
}
