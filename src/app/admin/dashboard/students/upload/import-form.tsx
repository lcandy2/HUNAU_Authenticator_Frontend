"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {Check, ChevronsUpDown, Loader2} from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"
import {useEffect, useState} from "react";
import {FILES_KEY_URL, USERS_KEYGROUP_URL, USERS_USERGROUP_URL} from "@/config/api";
import {Input} from "@/components/ui/input";

const FormSchema = z.object({
  keyGroup: z.string({
    required_error: "请选择一个密钥分类。",
  }),
  fileUpload: z.string({
    required_error: "请选择要上传的密钥文件。",
  }),
})

export function ImportForm() {
  const [identityOptions, setIdentityOptions] = useState([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [status, setStatus] = useState("idle");
  const [uploading, setUploading] = useState(false);

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
  }, []);

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //       </pre>
  //     ),
  //   })
  // }

  function onSubmit(data) {
    console.log("submit")
    setUploading(true);
    const formData = new FormData();
    const fileInput = document.querySelector('#fileUpload');
    formData.append('file', fileInput.files[0]); // 假设 fileUpload 是文件列表
    formData.append('keyIdentity', data.keyGroup);

    // console.log(fileInput.files[0])
    // console.log(data.fileUpload)

    fetch(FILES_KEY_URL, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(responseBody => {
      console.log(responseBody)
      if (responseBody.code === 201) {
        setStatus("success");
      } else if (responseBody.code === 402) {
        setStatus("wrong");
      } else {
        setStatus("failed");
      }
      setUploading(false);
    })
    .catch(error => {
      console.error('提交错误:', error);
      setUploading(false);
    });
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
              name="fileUpload"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>数据文件（xls/xlsx）</FormLabel>
                    <FormControl>
                      <Input type="file" id="fileUpload" placeholder="上传Excel工作簿..." {...field} />
                    </FormControl>
                    <FormDescription>这是你要上传的数据文件</FormDescription>
                    <FormMessage />
                  </FormItem>
              )}
          />
          <Button disabled={uploading} type="submit">
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {uploading ? '上传中' : '上传'}</Button>
          {status === "success" && (
              <div className="p-4 rounded-md bg-green-50">
                <p>上传成功，数据已成功导入。</p>
              </div>
          )}
          {status === "wrong" && (
              <div className="p-4 rounded-md bg-red-50">
                <p>数据格式不匹配，倒入失败。</p>
              </div>
          )}
          {status === "failed" && (
              <div className="p-4 rounded-md bg-red-50">
                <p>上传失败。</p>
              </div>
          )}
        </form>
      </Form>
  )
}
