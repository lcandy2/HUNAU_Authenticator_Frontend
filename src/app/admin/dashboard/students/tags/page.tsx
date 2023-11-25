import { Separator } from "@/components/ui/separator"
import DataList from "@/app/admin/dashboard/students/tags/data-list";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">班级管理</h3>
        <p className="text-sm text-muted-foreground">
          管理班级，与班级内学生数据。
        </p>
      </div>
      <Separator />
      <DataList />
    </div>
  )
}
