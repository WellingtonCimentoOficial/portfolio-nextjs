import React from 'react'
import styles from './page.module.css'
import {
    PiHandshakeThin, PiMegaphoneThin, PiCheckThin,
    PiCardsThreeThin, PiBrainThin, PiBriefcaseThin, PiCloudThin,
    PiClockCountdownThin
} from "react-icons/pi";
import { FaGithub } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import MainButton from '@/components/Buttons/MainButton/MainButton';
import TitleDescLayout from '@/layouts/TitleDescLayout/TitleDescLayout';
import SimpleCard from '@/components/Cards/SimpleCard/SimpleCard';
import ContactForm from '@/components/Forms/ContactForm/ContactForm';
import MainFilter from '@/components/Filters/MainFillter/MainFilter';
import { Metadata } from 'next';

type Props = {}
type defaultType = {
    title: string
    description: string
}
type TechStackType = defaultType & {
    data: {
        id: string,
        image: string,
        description: string
    }[]
}
type SoftSkillsType = defaultType & {
    data: {
        id: string,
        title: string,
        description: string
        icon: JSX.Element
        isRelevant: boolean
    }[]
}

export const metadata: Metadata = {
    title: "Portfólio",
    description: "Portfólio de Wellington Cimento, programador especializado em desenvolvimento web com React, TypeScript, Django e PostgreSQL."
}

const HomePage = (props: Props) => {
    const techStackSection: TechStackType = {
        title: "Tech Stack",
        description: "Tecnologias que eu utilizo para construir soluções robustas, escaláveis e inovadoras. A combinação certa de ferramentas do mercado, transformando suas ideias em produtos digitais de alta qualidade.",
        data: [
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677974/atom_eydxg7.png",
                description: "React",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677973/css-3_yx7nz6.png",
                description: "CSS3",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677977/django_ibacgu.png",
                description: "Django",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677981/html_zf6pww.png",
                description: "Html",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677985/js_qs7tfy.png",
                description: "JavaScript",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677983/mysql_dvepbh.png",
                description: "MySQL",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677986/postgre_yjvw3k.png",
                description: "PostgreSQL",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677989/python_nwuu3m.png",
                description: "Python",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677990/typescript_t2vwfo.png",
                description: "TypeScript",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677978/docker_oioaks.png",
                description: "Docker",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677979/git_esktrj.png",
                description: "Git",
            },
            {
                id: uuidv4(),
                image: "https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677982/github_ut6tbh.png",
                description: "Github",
            },
        ]
    }

    const softSkillsSection: SoftSkillsType = {
        title: "Soft Skills",
        description: "Competências essenciais que complementam minhas habilidades técnicas, facilitando a comunicação, a colaboração e a resolução de problemas. Essas qualidades me permitem trabalhar de forma eficaz em equipe, adaptar-me rapidamente a novas situações e manter um foco constante na entrega de resultados de alta qualidade.",
        data: [
            {
                id: uuidv4(),
                title: "Trabalho em equipe",
                description: "Habilidade para colaborar de forma eficaz com os outros para atingir objetivos comuns",
                icon: <PiHandshakeThin />,
                isRelevant: true
            },
            {
                id: uuidv4(),
                title: "Comunicação",
                description: "Capacidade de transmitir informações de maneira clara e concisa",
                icon: <PiMegaphoneThin />,
                isRelevant: false
            },
            {
                id: uuidv4(),
                title: "Resolução de Problemas",
                description: "Competência para encontrar soluções eficazes para desafios complexos",
                icon: <PiCheckThin />,
                isRelevant: true
            },
            {
                id: uuidv4(),
                title: "Pensamento Crítico",
                description: "Análise lógica e objetiva para avaliar informações e tomar decisões bem fundamentadas",
                icon: <PiCloudThin />,
                isRelevant: false
            },
            {
                id: uuidv4(),
                title: "Ética de Trabalho",
                description: "Compromisso com a excelência e a realização de tarefas com integridade.e",
                icon: <PiBriefcaseThin />,
                isRelevant: false
            },
            {
                id: uuidv4(),
                title: "Criatividade",
                description: "Capacidade de pensar fora da caixa e propor ideias inovadoras",
                icon: <PiBrainThin />,
                isRelevant: true
            },
            {
                id: uuidv4(),
                title: "Iniciativa",
                description: "Proatividade para tomar decisões e agir sem esperar instruções detalhadas",
                icon: <PiClockCountdownThin />,
                isRelevant: false
            },
            {
                id: uuidv4(),
                title: "Adaptabilidade",
                description: "Flexibilidade para se adaptar rapidamente a novas situações e mudanças",
                icon: <PiCardsThreeThin />,
                isRelevant: true
            },
        ]
    }

    const contactSection: defaultType = {
        title: "Contato",
        description: "Pronto para novas oportunidades e desafios? Entre em contato para discutir como posso contribuir com suas equipes e projetos."
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.containerSection} ${styles.containerMainSection}`}>
                <section className={styles.containerOne}>
                    <div className={styles.containerOneItem}>
                        <span className={styles.containerOneItemTitleOne}>Pronto para <span className={styles.highlight}>destacar</span> sua <span className={styles.highlight}>marca online</span>?</span>
                        <span className={styles.containerOneItemText}>
                            Transforme sua ideia em realidade digital utilizando tecnologias de ponta como Python, Django, React com TypeScript, banco de dados PostgreSQL e Docker. Vamos juntos criar soluções inovadoras e eficientes!
                        </span>
                        <div className={styles.containerOneItemButtons}>
                            <MainButton 
                                type='anchor' 
                                href='https://github.com/WellingtonCimentoOficial' 
                                disableHoverEffect 
                                filltype='borderonly' 
                                icon={<FaGithub />} 
                                backgroundColor='black' 
                                color='white'
                                target='_blank'
                            >
                                GitHub
                            </MainButton>
                            <MainButton type='anchor' href="" target="_blank" disableHoverEffect>Baixar CV</MainButton>
                        </div>
                    </div>
                    <div className={styles.containerOneimage}>
                        <img className={styles.containerOneImageImg} src="https://res.cloudinary.com/dmkxkaumk/image/upload/v1726677991/vecteezy_vector-illustration-of-a-person-concept-people-will_5426311_xonha4.png" alt="" />
                    </div>
                </section>
            </div>
            <section id='projects' className={`${styles.containerSection} ${styles.containerProjects}`}>
                <MainFilter />
            </section>
            <section id='techstack' className={`${styles.containerSection} ${styles.containerTechStack}`}>
                <TitleDescLayout title={techStackSection.title} description={techStackSection.description}>
                    <div className={`${styles.containerSectionBody} ${styles.containerTechStackBody}`}>
                        {techStackSection.data.map(item => (
                            <div key={item.id} className={styles.containerTechStackBodyItem}>
                                <img className={styles.containerTechStackBodyItemImage} src={item.image} alt={item.description} />
                            </div>
                        ))}
                    </div>
                </TitleDescLayout>
            </section>
            <section id='softskills' className={`${styles.containerSection} ${styles.containerSoftSkills}`}>
                <TitleDescLayout title={softSkillsSection.title} description={softSkillsSection.description}>
                    <div className={`${styles.containerSectionBody} ${styles.containerSoftSkillsBody}`}>
                        {(() => {
                            const quantityPerRow = 4
                            return (
                                Array.from(Array(softSkillsSection.data.length / quantityPerRow)).map((_, indexArr) => (
                                    <div className={styles.containerSoftSkillsBodyItem} key={indexArr}>
                                        {softSkillsSection.data.slice(indexArr * quantityPerRow, (indexArr + 1) * quantityPerRow).map(skill => (
                                            <SimpleCard
                                                key={skill.id}
                                                title={skill.title}
                                                description={skill.description}
                                                icon={skill.icon}
                                                mark={skill.isRelevant} />
                                        ))}
                                    </div>
                                ))
                            )
                        })()}
                    </div>
                </TitleDescLayout>
            </section>
            <section id='contact' className={`${styles.containerSection} ${styles.containerContact}`}>
                <TitleDescLayout title={contactSection.title} description={contactSection.description}>
                    <div className={`${styles.containerSectionBody} ${styles.containerContactBody}`}>
                        <ContactForm />
                    </div>
                </TitleDescLayout>
            </section>
        </div>
    )
}

export default HomePage