import React, { useContext } from "react"
import MainLayout from "@/layouts/MainLayout/MainLayout";
import HeaderSideBarFooterLayout from "@/layouts/HeaderSideBarFooterLayout/HeaderSideBarFooterLayout";
import { LoadingContext } from "@/contexts/LoadingContext";
import IconLoader from "@/components/Loaders/IconLoader/IconLoader";

type Props = {
    pathname: string
    children: React.ReactNode
}

const HandlerLayout = ({ pathname, children } : Props) => {
    const { isLoading } = useContext(LoadingContext)
    
    if(pathname.startsWith('/projects')){
        return (
            <HeaderSideBarFooterLayout>
                {children}
                {isLoading && <IconLoader transparency />}
            </HeaderSideBarFooterLayout>
        )
    }

    return (
        <MainLayout>
            {children}
            {isLoading && <IconLoader transparency />}
        </MainLayout>
    )
}

export default HandlerLayout