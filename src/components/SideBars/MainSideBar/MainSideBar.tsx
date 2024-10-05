import React from 'react'
import styles from './MainSideBar.module.css'
import { usePath } from '../../../hooks/usePath'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type MainSideBarType = {
    id: number | string,
    text: string,
}

type Props = {
    data: MainSideBarType[]
}

const MainSideBar = ({data}: Props) => {
    const { projectPath } = usePath()
    const pathname = usePathname()
    return (
        <div className={styles.wrapper}>
            <nav className={styles.container}>
                <ul className={styles.list} >
                    {data.map((item) => (
                        <li className={styles.listLi} key={item.id}>
                            <Link href={projectPath(item.id, item.text)} className={`${styles.navlink} ${pathname === projectPath(item.id, item.text) ? styles.active : ''}`}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default MainSideBar