import BlogDashboard from "@/components/dashboard/blog-dashboard"
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation"

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="">
       <BlogDashboard/>
        
    </div>
  )
}

export default Dashboard