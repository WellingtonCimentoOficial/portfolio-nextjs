"use client";

import React, { useState } from 'react'
import styles from './BasicSelect.module.css'
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import Link from 'next/link';
import { usePath } from '@/hooks/usePath';

export type DefaultSelectType = {id: number | string, text: string}

type Props = {
    data: DefaultSelectType[]
    current: DefaultSelectType | null
    setState?: React.Dispatch<React.SetStateAction<DefaultSelectType | null>>
    useLink?: boolean
}

const BasicSelect = ({data, current, useLink, setState}: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const { projectPath } = usePath()
    
    const handleClick = (item: DefaultSelectType) => {
        if(setState){
            setState(item)
        }
        setShow(false)
    }

    return (
        <div className={styles.wrapper} tabIndex={1} onBlur={() => !useLink && setShow(false)}>
            <div className={styles.container}>
                <div className={styles.header} onClick={() => setShow(oldValue => !oldValue)}>
                    <span className={styles.title}>{current?.text}</span>
                    {show ? (
                        <PiCaretUpBold className={styles.icon} />
                    ):(
                        <PiCaretDownBold className={styles.icon} />
                    )}
                </div>
                {show &&
                    <div className={styles.body}>
                        <ul className={styles.list}>
                            {data.map(item => (
                                useLink ? (
                                    <Link key={item.id} className={styles.listItem} href={`${projectPath(item.id, item.text)}`}>{item.text}</Link>
                                ):(
                                    <li key={item.id} className={styles.listItem} onClick={() => handleClick(item)}>{item.text}</li>
                                )
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default BasicSelect