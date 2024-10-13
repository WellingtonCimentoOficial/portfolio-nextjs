import TextContentArea from '@/components/ContentAreas/TextContentArea/TextContentArea'
import SubHeading from '@/components/Headings/SubHeading/SubHeading'
import DefaultLink from '@/components/Links/DefaultLink/DefaultLink'
import DefaultItemList from '@/components/Lists/DefaultItemList/DefaultItemList'
import DefaultList from '@/components/Lists/DefaultList/DefaultList'
import DefaultParagraph from '@/components/Paragraphs/DefaultParagraph/DefaultParagraph'
import BasicSelect, { DefaultSelectType } from '@/components/Selects/BasicSelect/BasicSelect'
import LineSeparator from '@/components/Separators/LineSeparator'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'
import styles from './page.module.css'
import { Metadata } from 'next'
import { ProjectType } from '@/types/projectType'
import { getProject, getProjects } from '@/utils/requests'
import { getPageTitle } from '@/utils/getPageTitle'
import ProjectsPageFragment from '@/fragments/ProjectsPageFragment/ProjectsPageFragment'

type Props = {
    params: {
        id: string
        projectName: string
    }
}

export const generateMetadata = async ({params} : Props): Promise<Metadata> => {
    const currentProject: ProjectType = await getProject({id: params.id, projectName: params.projectName})
    const images: string[] = currentProject.images.others.map(image => image.url)
    return {
        title: getPageTitle(currentProject?.title ?? 'Projeto'),
        description: currentProject?.description ?? 'Detalhes sobre o projeto',
        openGraph: {
            images: [currentProject.images.logo, ...images]
        }
    }
}

const ProjectPage = async ({params}: Props) => {
    const projectsData = await getProjects()
    const currentProjectdata = await getProject({id: params.id, projectName: params.projectName})

    const projectsSelect: DefaultSelectType[] = projectsData.map(project => ({id: project.id, text: project.title}))
    const currentProjectSelect: DefaultSelectType = {id: currentProjectdata.id, text: currentProjectdata.title}

    return (
        currentProjectdata && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.projectsSelect}>
                        <span className={styles.projectsSelectLabel}>Mudar de página</span>
                        <BasicSelect useLink data={projectsSelect} current={currentProjectSelect} />
                    </div>
                    <div className={styles.header}>
                        <div className={styles.headerTitleContainer}>
                            <h2 className={styles.headerTitle}>{currentProjectdata.title}</h2>
                            <div className={styles.version}>1.0.0</div>
                        </div>
                        <DefaultLink className={styles.headerIconContainer} href={currentProjectdata.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className={styles.headerIcon} />
                        </DefaultLink>
                    </div>
                    <div className={styles.body}>
                        <TextContentArea>
                            <LineSeparator />
                            {currentProjectdata.description.split('\n').map((description, index) => (
                                <DefaultParagraph key={index}>{description}</DefaultParagraph>
                            ))}
                            {currentProjectdata.details.features.length > 0 &&
                                <>
                                    <SubHeading>Funcionalidades</SubHeading>
                                    <DefaultList>
                                        {currentProjectdata.details.features.map(feature => (
                                            <DefaultItemList key={feature.id}>{feature.text}</DefaultItemList>
                                        ))}
                                    </DefaultList>
                                </>
                            }
                            {currentProjectdata.images.others &&
                                <ProjectsPageFragment images={currentProjectdata.images.others} />
                            }

                            {/* <SubHeading>Getting Started</SubHeading>
                            <DefaultList>
                                <DefaultItemList>
                                    Super quick — try the <DefaultLink href="/">Quickstart Guide</DefaultLink>.
                                </DefaultItemList>
                                <DefaultItemList>
                                    More general — try <DefaultLink href="/">Building an Application with Spring Boot</DefaultLink>
                                </DefaultItemList>
                                <DefaultItemList>
                                    More specific — try <DefaultLink href="/">Building a RESTful Web Service</DefaultLink>.
                                </DefaultItemList>
                                <DefaultItemList>
                                    Or search through all our guides on the <DefaultLink href="/">Guides</DefaultLink> homepage.
                                </DefaultItemList>
                            </DefaultList>
                            <SubHeading>Talks and videos</SubHeading>
                            <DefaultList>
                                <DefaultItemList>
                                    <DefaultLink href="/">Mind the Gap: Jumping from Spring Boot 2.x to 3.x</DefaultLink>
                                </DefaultItemList>
                                <DefaultItemList>
                                    <DefaultLink href="/">Demystifying Spring Internals</DefaultLink>
                                </DefaultItemList>
                                <DefaultItemList>
                                    <DefaultLink href="/">Ahead Of Time and Native in Spring Boot 3.0</DefaultLink>
                                </DefaultItemList>
                                <DefaultItemList>
                                    <DefaultLink href="/">Improve Your Developer Experience with Spring Boot Dev Services</DefaultLink>
                                </DefaultItemList>
                            </DefaultList> */}
                        </TextContentArea>
                    </div>
                </div>
            </div>
        )
    )
}

export default ProjectPage