"use client";

import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginCard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const signInWithGoogle = async () => {
    const apiKey = localStorage.getItem("openai-api-key");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/google`, {
        credentials: "include",
      });
      const data = await response.json();
      setLoading(false);
      if (!data.url) return console.error("No URL returned");
      const authWindow = window.open(
        data.url,
        "_blank",
        "height=600,width=600"
      );
      const checkWindowClosed = setInterval(async () => {
        if (authWindow && authWindow.closed) {
          clearInterval(checkWindowClosed);
          const user = await checkUser();
          if (user?.ok) {
            if (apiKey) {
              return router.push("/");
            }
            return router.push("/credentials");
          } else {
            toast({
              title: "Failed to sign in",
              description: "Please try again",
            });
          }
        }
      }, 500);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const checkUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/user`, {
        credentials: "include",
      });
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          Sign in with Google
        </CardTitle>
        <CardDescription>
          Sign in to your account using your Google credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 ">
          <Button
            onClick={signInWithGoogle}
            variant="outline"
            loading={loading}
            className="w-full"
          >
            {loading ? (
              "Loading"
            ) : (
              <>
                <Google className="mr-2 h-5 w-5" />
                Sign in with Google
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
