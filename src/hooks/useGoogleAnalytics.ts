import { useCallback, useEffect, useState } from "react"
import { useScriptExists } from "./useScriptExists"

type IdType = {
    id: string
}

type CallbackType = {
    callback?: () => void
}

type ErrorCallbackType = {
    errorCallback?: () => void
}

type CallbacksType = CallbackType & ErrorCallbackType

export const useGoogleAnalytics = ({id} : IdType) => {
    const [isGoogleAnalyticsScriptLoaded, SetIsGoogleAnalyticsScriptLoaded] = useState<boolean>(false)
    const [hasRendered, setHasRendered] = useState<boolean>(false)
    const { ScriptExists } = useScriptExists()

    const src = 'https://www.googletagmanager.com/gtag/js?id=' + id

    const createScriptGoogleAnalytics = useCallback(async () => {
        return new Promise<void>((resolve, reject) => {
            if(!ScriptExists(src)){
                const script = document.createElement('script')
                script.src = src
                script.async = true
                script.defer = false
                script.onload = () => {
                    SetIsGoogleAnalyticsScriptLoaded(true)
                    resolve()
                }
                script.onerror = () => reject(new Error("Failed to load Google Analytics"))
                document.head.appendChild(script)
            }else{
                resolve()
            }
        })
    }, [src, ScriptExists])

    const insertScriptFunctions = useCallback(async ({callback} : CallbackType) => {
        return new Promise<void>((resolve) => {
            const script = document.createElement('script')
            script.textContent = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${id}');
            `
            document.head.appendChild(script)
            if(callback){
                callback()
            }
            setHasRendered(true)
            resolve()
        })
    }, [setHasRendered])

    const initializeGoogleAnalytics = useCallback(async ({callback, errorCallback} : CallbacksType) => {
        try {
            if(!ScriptExists(src) && id !== ''){
                await createScriptGoogleAnalytics()
            }else if(isGoogleAnalyticsScriptLoaded && !hasRendered){
                await insertScriptFunctions({callback})
            }
        } catch {
            if(errorCallback){
                errorCallback()
            }
        }
    }, [isGoogleAnalyticsScriptLoaded, hasRendered, ScriptExists, createScriptGoogleAnalytics, insertScriptFunctions])

    useEffect(() => {
        SetIsGoogleAnalyticsScriptLoaded(ScriptExists(src))
    }, [ScriptExists])

    return {initializeGoogleAnalytics}
}