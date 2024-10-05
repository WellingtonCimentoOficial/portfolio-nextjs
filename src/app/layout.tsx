"use client"

import { CookiesContextProvider } from "@/contexts/CookiesContext";
import { LoadingContextProvider } from "@/contexts/LoadingContext";
import '../styles/globals.css'
import { usePathname } from "next/navigation";
import HandlerLayout from "@/layouts/HandlerLayout/HandlerLayout";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const pathname = usePathname()

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