"use client"

import { ProjectImageType } from '@/types/projectType'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './ImagePreviewModal.module.css'
import { usePreventScroll } from '@/hooks/usePreventScroll'
import { PiCaretLeftBold, PiCaretRightBold, PiPlus } from 'react-icons/pi'

type Props = {
    current: ProjectImageType
    data: ProjectImageType[]
    setState: React.Dispatch<React.SetStateAction<ProjectImageType | null>>
}

const ImagePreviewModal = ({current, data, setState}: Props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const { preventScroll } = usePreventScroll()

    const handlePrevious = () => {
        if(currentIndex - 1 >= 0){
            setState(data[currentIndex - 1])
        }else{
            setState(data[data.length - 1])
        }
    }

    const handleNext = () => {
        if(currentIndex + 1 <= data.length - 1){
            setState(data[currentIndex + 1])
        }else{
            setState(data[0])
        }
    }

    const handleEsc = (event: KeyboardEvent) => {
        if(event.key.toLocaleLowerCase() === 'escape' || event.key.toLocaleLowerCase() === 'esc'){
            setState(null)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [])

    useEffect(() => {
        if(window.innerWidth < 1280){
            setState(null)
        }
    })

    useEffect(() => {
        const index = data.findIndex(image => image.id === current.id)
        setCurrentIndex(index)
    }, [data, current, setCurrentIndex])

    useEffect(() => {
        const timeout = setTimeout(() => preventScroll(true), 300)
        
        return () => {
            clearTimeout(timeout)
            preventScroll(false)
        }
    }, [preventScroll])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.flexController} onClick={handlePrevious}>
                    <PiCaretLeftBold className={styles.icon} />
                </div>
                <div className={styles.flexImage}>
                    <Image 
                        sizes='100%'
                        style={{objectFit: 'cover'}}
                        src={current.url}
                        alt=''
                        fill
                    />
                    <div className={`${styles.flexController} ${styles.closeController}`} onClick={() => setState(null)}>
                        <PiPlus className={`${styles.icon} ${styles.closeIcon}`} />
                    </div>
                </div>
                <div className={styles.flexController} onClick={handleNext}>
                    <PiCaretRightBold className={styles.icon} />
                </div>
            </div>
        </div>
    )
}

export default ImagePreviewModal