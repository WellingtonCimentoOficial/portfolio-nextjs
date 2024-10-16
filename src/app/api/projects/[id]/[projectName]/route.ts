import { projectData } from "@/datas/projectsData";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

type Props = {
    params: {
        id: string,
        projectName: string
    }
}

export async function GET(request: Request, context: Props) {
    const { params } = context
    const project = projectData.find(project => project.id.toString() === params.id && slugify(project.title) === params.projectName)

    if(!project){
        return NextResponse.json(null, { status: 404 })
    }

    return NextResponse.json(project)
}