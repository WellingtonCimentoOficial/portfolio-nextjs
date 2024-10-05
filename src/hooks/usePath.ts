import { slugify } from "@/utils/slugify"
import { useCallback } from "react"

export const usePath = () => {
    const projectPath = useCallback((id: number | string, title: string) => {
        return `/projects/${id}/${slugify(title)}`
    }, [])

    return {projectPath}
}