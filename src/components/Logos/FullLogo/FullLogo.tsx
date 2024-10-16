import React from 'react'
import styles from "./FullLogo.module.css"
import IconLogo from '../IconLogo/IconLogo'


const FullLogo = () => {
    const name = process.env.NEXT_PUBLIC_NAME
    return (
        <div className={styles.wrapper}>
            <IconLogo className={styles.titleLogo} />
            <span className={styles.titleText}>{name}</span>
        </div>
    )
}

export default FullLogo