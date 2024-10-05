"use client";

import React, { useCallback, useContext, useState, useEffect } from 'react'
import styles from './MainFilter.module.css'
import TitleDescLayout from '@/layouts/TitleDescLayout/TitleDescLayout'
import BasicSelect, { DefaultSelectType } from '@/components/Selects/BasicSelect/BasicSelect'
import InlineSelect from '@/components/Selects/InlineSelect/InlineSelect'
import { ProjectType } from '@/types/projectType'
import { LoadingContext } from '@/contexts/LoadingContext'
import { useRequests } from '@/hooks/useRequests'
import PreviewCard from '@/components/Cards/PreviewCard/PreviewCard'
import ProjectModal from '@/components/Modals/ProjectModal/ProjectModal'

const MainFilter = () => {
    const projectsSection: {title: string, description: string} = {
        title: "Projetos",
        description: "Uma coleção dos meus projetos pessoais que demonstram minhas habilidades e paixão por desenvolver soluções criativas e funcionais."
    }

    const selectDataOne: DefaultSelectType[] = [
        { id: 0, text: "Todos" },
        { id: 1, text: "Favoritos" },
    ]
    const selectDataTwo: DefaultSelectType[] = [
        { id: 0, text: "Relevância" },
    ]
    const selectDataThree: DefaultSelectType[] = [
        { id: 0, text: "Todas" },
        { id: 2, text: "Linha de comando" },
        { id: 1, text: "Gráfica" },
    ]

    const [projects, setProjects] = useState<ProjectType[]>([])
    const [modalData, setModalData] = useState<ProjectType | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [filterOne, setFilterOne] = useState<DefaultSelectType | null>(selectDataOne[0])
    const [filterTwo, setFilterTwo] = useState<DefaultSelectType | null>(selectDataTwo[0])
    const [filterThree, setFilterThree] = useState<DefaultSelectType | null>(selectDataThree[0])
    const { setIsLoading } = useContext(LoadingContext)
    const {getProjects} = useRequests()
    const [originalData, setOriginalData] = useState<ProjectType[]>([])

    const handleModal = (data: ProjectType) => {
        setModalData(data)
        setShowModal(true)
    }
    
    const handleFilters = useCallback(() => {
        const projectDataFiltered = originalData.filter(project => {
            const matchesFavorite = filterOne?.id === 0 || project.isFavorite === true
            const matchesInterface = filterThree?.id === 0 || project.isGUI === (filterThree?.id === 1 ? true : false)
            
            return matchesFavorite && matchesInterface
        })
        const projectDataSorted = projectDataFiltered.sort((a, b) => {
            return (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0)
        })
        setProjects(projectDataSorted)
    }, [filterOne, filterThree, originalData, setProjects])

    const handleGetData = useCallback(async () => {
        setIsLoading(true)
        const data = await getProjects()
        if(data) {
            setProjects(data)
            setOriginalData(data)
        }
        setIsLoading(false)
    }, [setIsLoading, setProjects, setOriginalData])
 
    useEffect(() => {handleGetData()}, [handleGetData])

    useEffect(() => {
        setIsLoading(true)
        handleFilters()
        setIsLoading(false)
    }, [filterThree, filterOne, setIsLoading, handleFilters])

    return (
        <>
            <TitleDescLayout title={projectsSection.title} description={projectsSection.description}>
                <div className={styles.containerProjectsFilters}>
                    <div className={styles.containerProjectsFiltersFlexItemStart}>
                        <span className={styles.containerProjectsFiltersFlexItemText}>Mostrar:</span>
                        <BasicSelect data={selectDataOne} current={filterOne} setState={setFilterOne} />
                    </div>
                    <div className={styles.containerProjectsFiltersGroup}>
                        <div className={styles.containerProjectsFiltersFlexItemCenter}>
                            <InlineSelect data={selectDataThree} current={filterThree} setState={setFilterThree} />
                        </div>
                        <div className={styles.containerProjectsFiltersFlexItemEnd}>
                            <span className={styles.containerProjectsFiltersFlexItemText}>Ordenar por:</span>
                            <BasicSelect data={selectDataTwo} current={filterTwo} setState={setFilterTwo} />
                        </div>
                    </div>
                </div>
                <div className={styles.containerProjectsBody}>
                    {projects.map(project => (
                        <PreviewCard key={project.id} data={project} setState={handleModal} />
                    ))}
                    {projects.length === 0 &&
                        <span>😓😓😓 Infelizmente não encontramos nenhum item com esses parâmetros 😓😓😓</span>
                    }
                </div>
            </TitleDescLayout>
            {modalData && showModal &&
                <ProjectModal
                    title={modalData.title}
                    href={`/projects/${modalData.id}/${modalData.title.toLowerCase().split(" ").join("-")}`}
                    type='anchor'
                    data={modalData}
                    setCloseWindowState={(value) => setShowModal(!value)}
                />
            }
        </>

    )
}

export default MainFilter