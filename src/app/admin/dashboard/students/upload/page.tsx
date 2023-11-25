import { Separator } from "@/components/ui/separator"
import {ImportForm} from "@/app/admin/dashboard/students/upload/import-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">学生数据导入</h3>
        <p className="text-sm text-muted-foreground">
          你可以在这里导入学生数据。
        </p>
      </div>
      <Separator />
      <ImportForm />
    </div>
  )
}
