import { useCallback } from "react"
import { useSlug } from "./useSlug"
import { ProjectType } from "@/types/projectType"

export const useRequests = () => {
    const {slugify} = useSlug()
    const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

    const getProjects = useCallback(async () => {
        try {
            const responseProjects = await fetch(BASE_URL + `/api/projects`)
            const projectsData: ProjectType[] = await responseProjects.json()
            return projectsData
        } finally {
        }
    }, [])

    const getProject = async ({id, projectName} : {id: string, projectName: string}) => {
        try {
            const responseCurrentProject = await fetch(BASE_URL + `/api/projects/${id}/${slugify(projectName)}`)
            const currentProjectdata: ProjectType = await responseCurrentProject.json()
            return currentProjectdata
        } finally {
        }
    }

    return {BASE_URL, getProject, getProjects}
}