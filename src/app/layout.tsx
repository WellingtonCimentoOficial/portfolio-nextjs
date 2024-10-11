"use client"

import { CookiesContextProvider } from "@/contexts/CookiesContext";
import { LoadingContextProvider } from "@/contexts/LoadingContext";
import '../styles/globals.css'
import { usePathname } from "next/navigation";
import HandlerLayout from "@/layouts/HandlerLayout/HandlerLayout";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useEffect } from "react";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const pathname = usePathname()
    const { initializeGoogleAnalytics } = useGoogleAnalytics({
        id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''
    })

    useEffect(() => {
        initializeGoogleAnalytics({})
    }, [initializeGoogleAnalytics])

    return (
        <LoadingContextProvider>
            <CookiesContextProvider>
                <html lang="pt-BR">
                    <body>
                        <HandlerLayout pathname={pathname}>
                            {children}
                        </HandlerLayout>
                    </body>
                </html>
            </CookiesContextProvider>
        </LoadingContextProvider>
    )
}