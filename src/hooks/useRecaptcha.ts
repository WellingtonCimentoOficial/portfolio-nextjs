import { useCallback, useEffect, useState } from "react"
import { useScriptExists } from "./useScriptExists"
import { RecaptchaOptionsType } from "../types/recaptcha"

export const useRecaptcha = () => {
    const [isRecaptchaScriptLoaded, SetIsRecaptchaScriptLoaded] = useState<boolean>(false)
    const [hasRendered, setHasRendered] = useState<boolean>(false)
    const { ScriptExists } = useScriptExists()

    const src = 'https://www.google.com/recaptcha/api.js'

    const createScriptRecaptcha = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if(!ScriptExists(src)){
                const script = document.createElement('script')
                script.src = src
                script.async = true
                script.defer = true
                script.onload = () => {
                    SetIsRecaptchaScriptLoaded(true)
                    resolve()
                }
                script.onerror = () => reject(new Error("Failed to load reCaptcha"))
                document.head.appendChild(script)
            }else{
                resolve()
            }
        })

    }, [ScriptExists])

    const removeBagde = useCallback(() => {
        const style = document.createElement("style")
        style.innerHTML = ".grecaptcha-badge { visibility: hidden; }"

        document.head.appendChild(style)
    }, [])

    const renderRecaptcha = useCallback(async ({ sitekey, container, badge, callback, errorCallback} : RecaptchaOptionsType) => {
        return new Promise<void>((resolve, reject) => {
            if(window.grecaptcha){
                window.grecaptcha.ready(() => {
                    window.grecaptcha.render(container, {
                        sitekey, 
                        size: "invisible", 
                        callback, "error-callback": 
                        errorCallback ?? (() => null)
                    })
                    setHasRendered(true)
                    resolve()
                })
                if(badge === "hidden"){
                    removeBagde()
                }
            }else{
                reject(new Error("Failed to render reCaptcha"))
            }
        })
    }, [removeBagde])

    const initializeRecaptcha = useCallback(async ({sitekey, container, badge, callback, errorCallback} : RecaptchaOptionsType) => {
        try {
            if(!ScriptExists(src) && sitekey !== ''){
                await createScriptRecaptcha()
            }
            !hasRendered && await renderRecaptcha({sitekey, container, badge, callback, errorCallback})
        } catch{
            // console.error("erooooo")
        }
    }, [ScriptExists, renderRecaptcha, createScriptRecaptcha, hasRendered])

    const getRecaptchaToken = useCallback(() => {
        if(window.grecaptcha){
            window.grecaptcha.execute()
        }
    }, [])

    useEffect(() => {
        SetIsRecaptchaScriptLoaded(ScriptExists(src))
    }, [ScriptExists])

    return { initializeRecaptcha, getRecaptchaToken, isRecaptchaScriptLoaded }
}