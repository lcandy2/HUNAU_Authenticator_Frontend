import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function RecentQuery() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>张</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="font-medium text-sm leading-none">张敏</p>
          <p className="text-sm text-muted-foreground">
            202140306093
          </p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">刚刚</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>王</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">王洋</p>
          <p className="text-sm text-muted-foreground">202140362458</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">5分钟前</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>粟</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">粟伟</p>
          <p className="text-sm text-muted-foreground">
            202140393184
          </p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">6分钟前</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>聂</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">聂磊</p>
          <p className="text-sm text-muted-foreground">202140324835</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">15分钟前</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>李</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">李静</p>
          <p className="text-sm text-muted-foreground">202140328172</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">今天 16:24</div>
      </div>
    </div>
  )
}
