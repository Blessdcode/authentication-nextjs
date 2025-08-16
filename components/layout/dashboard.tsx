/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut } from "lucide-react";

const Dashboard = () => {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/login"); // Redirect if not logged in
  //   }
  // }, [status, router]);

  // if (status === "loading") {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-4 hidden md:block">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800">
            📊 Overview
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800">
            ⚙️ Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800">
            📩 Messages
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Welcome!
          </h1>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="flex items-center gap-2">
            <LogOut size={18} />
            Logout
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-gray-500">Total users registered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$12,345</p>
              <p className="text-gray-500">This month&#39;s revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">567</p>
              <p className="text-gray-500">Unread messages</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
