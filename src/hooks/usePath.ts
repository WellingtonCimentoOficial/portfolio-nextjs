import { useCallback } from "react"
import { useSlug } from "./useSlug"

export const usePath = () => {
    const { slugify } = useSlug()
    const projectPath = useCallback((id: number | string, title: string) => {
        return `/projects/${id}/${slugify(title)}`
    }, [])

    return {projectPath}
}