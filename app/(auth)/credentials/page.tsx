"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  const saveApiKey = () => {
    if (apiKey.length === 0) {
      return;
    }
    localStorage.setItem("openai-api-key", apiKey);
    router.push("/");
  };

  return (
    <main className="flex w-full justify-center items-center h-[calc(100dvh-100px)]">
      <Card className="mx-auto max-w-md bg-background rounded-xl">
        <CardHeader className="space-y-2 text-left p-6">
          <CardTitle className="text-2xl font-semibold">
            Enter your OpenAI API Key
          </CardTitle>
          <CardDescription>
            Provide your API key to access the full power of OpenAI's language
            models.
          </CardDescription>
        </CardHeader>

        <CardContent className=" pt-0 px-6 pb-6">
          <Separator className="mb-6 px-4" />
          <div className="space-y-4 ">
            <Label htmlFor="apiKey" className="block mb-1 font-medium">
              API Key
            </Label>
            <Input
              onChange={(e) => setApiKey(e.target.value)}
              id="apiKey"
              type="password"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full"
            />
          </div>
          <Button onClick={saveApiKey} type="submit" className="w-full my-4">
            Submit
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
