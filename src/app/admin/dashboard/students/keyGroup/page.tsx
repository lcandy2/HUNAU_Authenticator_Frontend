import { Separator } from "@/components/ui/separator"
import DataList from "@/app/admin/dashboard/students/keyGroup/data-list";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">密钥分类</h3>
        <p className="text-sm text-muted-foreground">
          管理密钥分类的分类。
        </p>
      </div>
      <Separator />
      <DataList />
    </div>
  )
}
