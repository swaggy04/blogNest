import LeftComponent from "@/components/dashboard/Left-Component";

const layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full dark:bg-black bg-blue-50">
            <div className="flex ">
                <LeftComponent />
                <div className="flex-1 p-4 ">
                    {children}
                </div>
            </div>
        </div>
    )

}

export default layout;