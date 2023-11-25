import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">管理员账户管理</h3>
        <p className="text-sm text-muted-foreground">
          在这里管理你的账户，或添加其他账户。
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
