import { ProjectType } from "@/types/projectType"
import { slugify } from "./slugify"

export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

export const getProjects = async () => {
    try {
        const responseProjects = await fetch(`/api/projects`)
        const projectsData: ProjectType[] = await responseProjects.json()
        return projectsData
    } finally {
    }
}

export const getProject = async ({id, projectName} : {id: string, projectName: string}) => {
    try {
        const responseCurrentProject = await fetch(`/api/projects/${id}/${slugify(projectName)}`)
        const currentProjectdata: ProjectType = await responseCurrentProject.json()
        return currentProjectdata
    } finally {
    }
}