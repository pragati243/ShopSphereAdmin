import { UserButton } from "@clerk/nextjs"
import { MainNav } from "./main-nav"
import  StoreSwitcher  from "./store-switcher"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from './theme-toggle';

const Navbar = async () => {
    const { userId} = auth();

    if(!userId){
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where:{
            userId,
        },
    })
    return(
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                    <StoreSwitcher items={stores} />
                </div>
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar