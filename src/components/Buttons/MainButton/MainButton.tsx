"use client"

import React, { useRef } from 'react'
import styles from './MainButton.module.css'

type Props = {
    id?: string
    type: 'button'|'anchor'
    href?: string
    filltype?: 'default'|'borderonly'
    disableHoverEffect?: boolean
    children: string
    submit?: boolean
    icon?: React.ReactElement
    backgroundColor?: string
    color?: string
    target?: '_self'|'_blank'
    disabled?: boolean
    onClick?: () => void
}

const MainButton: React.FC<Props> = ({
    children, href="/", filltype='default', disableHoverEffect, 
    type, submit, icon, backgroundColor='var(--principal-color)', 
    color='white', target='_self', id, disabled, onClick}: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const buttonAnchorRef = useRef<HTMLAnchorElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)

    const style = backgroundColor && filltype === 'default' ? 
    {backgroundColor: backgroundColor, color: color} : 
    backgroundColor && filltype === 'borderonly' ? 
    {backgroundColor: color, color: backgroundColor} : undefined
    
    const styleIcon = backgroundColor && filltype === 'default' ? 
    {fill: color} : backgroundColor && filltype === 'borderonly' ? 
    {fill: backgroundColor} : undefined

    const handleHoverEffect = (state: 'in'|'out') => {
        const element = type === 'button' ? buttonRef.current : buttonAnchorRef.current
        const elementColor = filltype === 'borderonly' ? (color||'') : (backgroundColor||'')
        const elementBackgroundColor = filltype === 'borderonly' ? (backgroundColor||'') : (color||'')
        const elementIcon = iconRef.current?.firstElementChild as SVGSVGElement

        if(state === 'in'){
            if(element){
                element.style.backgroundColor = elementBackgroundColor
                element.style.color = elementColor
                if(icon && elementIcon){
                    elementIcon.style.fill = elementColor
                }
            }
        }else{
            if(element){
                element.style.backgroundColor = elementColor
                element.style.color = elementBackgroundColor
                if(icon && elementIcon){
                    elementIcon.style.fill = elementBackgroundColor
                }
            }
        }
    }

    const defaultProps = {
        style: {...style, borderColor: backgroundColor},
        className: `${styles.button} ${disabled ? styles.disabled : null}`,
        onMouseEnter: () => !disableHoverEffect && handleHoverEffect('in'),
        onMouseOut:() => !disableHoverEffect && handleHoverEffect('out'),
        onClick
    }

    switch(type){
        case 'button':
            return (
                <button disabled={disabled} id={id} ref={buttonRef} type={submit ? 'submit' : 'button'} {...defaultProps}>
                    <>
                        {icon &&
                            <div ref={iconRef} className={styles.containerIcon}>
                                {React.cloneElement(icon, {className: styles.icon, style: {...styleIcon}})}
                            </div>
                        }
                        {children}
                    </>
                </button>
            )
        case 'anchor':
            return (
                <a id={id} ref={buttonAnchorRef} {...defaultProps} href={href} target={target} rel="noopener noreferrer">
                    <>
                        {icon &&
                            <div ref={iconRef} className={styles.containerIcon}>
                                {React.cloneElement(icon, {className: styles.icon, style: {...styleIcon}})}
                            </div>
                        }
                        {children}
                    </>
                </a>
            )
    }
}

export default MainButton