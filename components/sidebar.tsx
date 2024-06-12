"use client";

import { Book, InboxIcon, LogOut, SendIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "./auth-provider";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { linkItems } from "@/data";

export default function SideBar() {
  const { signOut, user, loading } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const apiKey = localStorage.getItem("openai-api-key");
    if (!apiKey) {
      router.push("/credentials");
    }
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };
  const handleConfirmLogout = () => {
    signOut();
    setIsLogoutModalOpen(false);
  };
  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };
  return (
    <>
      <div className="bg-background border-r border-border  w-16 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          {linkItems.map(({ href, icon,  }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-center w-10 h-10 rounded-md ${
                pathname === href && "bg-muted"
              } hover:bg-muted transition-colors`}
              prefetch={false}
            >
              {icon}
            </Link>
          ))}
        </div>
        <div className="mt-auto">
          <Button
            variant="ghost"
            size={"icon"}
            onClick={handleLogout}
            className="flex items-center justify-center  rounded-md hover:bg-muted transition-colors"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
      <AlertDialog open={isLogoutModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelLogout}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
