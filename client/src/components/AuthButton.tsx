import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
  const { user, status, login, logout } = useAuth();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" className={className} disabled>
        <User className="w-4 h-4" />
      </Button>
    );
  }

  if (user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">
              {user.name || t.authGuest}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-w-[95vw] mx-auto">
          <DialogHeader>
            <DialogTitle>{user.name || t.authGuest}</DialogTitle>
            <DialogDescription>{user.email}</DialogDescription>
          </DialogHeader>
          <Button onClick={logout} variant="outline" className="w-full gap-2">
            <LogOut className="w-4 h-4" />
            {t.authLogout}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline">{t.authLogin}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-[95vw] mx-auto">
        <DialogHeader>
          <DialogTitle>{t.authLogin}</DialogTitle>
          <DialogDescription>
            {t.resultLoginToSave}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Button onClick={() => login("google")} className="w-full">
            {t.authContinueGoogle}
          </Button>
          <Button
            onClick={() => login("apple")}
            variant="outline"
            className="w-full"
          >
            {t.authContinueApple}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
