import React, { forwardRef } from 'react'
import styles from './DefaultLink.module.css'
import Link, { LinkProps } from 'next/link'

type Props = {
    className?: string
    target?: '_blank' | '_parent' | '_self' | '_top'
    rel?: string
    children: React.ReactNode
} & LinkProps

const DefaultLink = forwardRef<HTMLAnchorElement, Props>(({className, href, target, rel, children, ...rest}, ref) => {
    return (
        <Link ref={ref} target={target} rel={rel} className={styles.link} href={`${href}`.toString()} {...rest}>{children}</Link>
    )
})

export default DefaultLink