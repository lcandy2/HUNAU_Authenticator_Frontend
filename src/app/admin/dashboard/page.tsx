import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"
import DashboardPage from "@/components/admin/dashboard/page";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">总览</h3>
        <p className="text-sm text-muted-foreground">
          查看与班级内学生数据。
        </p>
      </div>
      <Separator />
      <DashboardPage />
    </div>
  )
}
