import React from 'react'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import MainFooter from '../../components/Footers/MainFooter/MainFooter'
import WidthLayout from '../WidthLayout/WidthLayout'
import DefaultLayout from '../DefaultLayout/DefaultLayout'
import type { Metadata } from "next";

type Props = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Portfólio de Wellington Cimento, programador especializado em desenvolvimento web com React, TypeScript, Django e PostgreSQL.",
}

const MainLayout = ({children}: Props) => {
    return (
        <DefaultLayout>
            <MainHeader />
            <WidthLayout>
                {children}
            </WidthLayout>
            <MainFooter />
        </DefaultLayout>
    )
}

export default MainLayout