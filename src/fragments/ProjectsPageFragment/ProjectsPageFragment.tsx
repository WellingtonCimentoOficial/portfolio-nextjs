"use client"

import SubHeading from '@/components/Headings/SubHeading/SubHeading'
import ImagePreviewModal from '@/components/Modals/ImagePreviewModal/ImagePreviewModal'
import DefaultParagraph from '@/components/Paragraphs/DefaultParagraph/DefaultParagraph'
import React, { useState } from 'react'
import styles from './ProjectsPageFragment.module.css'
import { ProjectImageType } from '@/types/projectType'
import Image from 'next/image'

type Props = {
    images: ProjectImageType[]
}

const ProjectsPageFragment = ({images}: Props) => {
    const [currentImage, setCurrentImage] = useState<ProjectImageType | null>(null)
    return (
        <>
            <SubHeading>Imagens</SubHeading>
            <DefaultParagraph>Nesta seção, você encontrará uma coleção de capturas de tela do meu projeto. As imagens destacam as principais funcionalidades e o design da aplicação, proporcionando uma visão clara de como o projeto opera na prática. Cada screenshot foi cuidadosamente selecionado para ilustrar a experiência do usuário e a interface, permitindo que você compreenda melhor o conceito e a execução do projeto.</DefaultParagraph>
            <ul className={styles.imagesList}>
                {images.map(image => (
                    <li key={image.id} className={styles.imagesListLi} onClick={() => setCurrentImage(image)}>
                        <Image 
                            sizes='100%'
                            fill
                            src={image.url}
                            alt=''
                        />
                    </li>
                ))}
            </ul>
            {currentImage !== null &&
                <ImagePreviewModal current={currentImage} data={images} setState={setCurrentImage} />
            }
        </>
    )
}

export default ProjectsPageFragment