import SubHeading from '@/components/Headings/SubHeading/SubHeading'
import DefaultItemList from '@/components/Lists/DefaultItemList/DefaultItemList'
import DefaultList from '@/components/Lists/DefaultList/DefaultList'
import ContentLayout from '@/layouts/ContentLayout/ContentLayout'
import { Metadata } from 'next'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

type DataType = {
    id: string,
    title: string
    items: {
            id: string,
            text: string
    }[]
}

export const metadata: Metadata =  {
    title: 'Política de Privacidade',
    description: 'Nossa Política de Privacidade detalha como coletamos, usamos e protegemos suas informações pessoais, assegurando sua privacidade e segurança.',
    openGraph: {
        title: 'Política de Privacidade',
        description: 'Descubra como suas informações são tratadas e protegidas, conforme nossa Política de Privacidade.',
    },
}

const PrivacyPolicyPage = () => {
    const appName = process.env.NEXT_PUBLIC_NAME
    const data: DataType[] = [
        {
            id: uuidv4(),
            title: "⁠Informações que Coletamos",
            items: [
                {
                    id: uuidv4(),
                    text: "Coletamos informações pessoais e não pessoais quando você interage com nosso site. Isso pode incluir, mas não se limita a, seu nome, e-mail e outras informações que você decide fornecer."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "Uso de Dados",
            items: [
                {
                    id: uuidv4(),
                    text: "Utilizamos as informações coletadas para melhorar nossos serviços, responder a solicitações e analisar o uso do site por meio do Google Analytics. Também podemos usar essas informações para enviar comunicações relevantes."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "reCAPTCHA e Cloudflare",
            items: [
                {
                    id: uuidv4(),
                    text: "Utilizamos o reCAPTCHA do Google para proteger nosso site contra spam e abusos. Isso pode envolver a coleta de dados, como seu endereço IP e informações sobre seu dispositivo. Além disso, usamos o Cloudflare para proteção contra DDoS, que pode exibir uma página de verificação antes de permitir o acesso ao site."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "Proteção de Dados",
            items: [
                {
                    id: uuidv4(),
                    text: "Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum método de transmissão pela internet é 100% seguro, e não podemos garantir segurança absoluta."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "Cookies",
            items: [
                {
                    id: uuidv4(),
                    text: "Utilizamos cookies para melhorar sua experiência em nosso site. Você pode controlar o uso de cookies através das configurações do seu navegador."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "Compartilhamento de Informações",
            items: [
                {
                    id: uuidv4(),
                    text: "Não vendemos ou alugamos suas informações pessoais a terceiros. Podemos compartilhar suas informações com prestadores de serviços que nos ajudam a operar nosso site, desde que esses terceiros concordem em manter a confidencialidade."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "Alterações a Esta Política",
            items: [
                {
                    id: uuidv4(),
                    text: "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através de um aviso em nosso site."
                }
            ]
        },
        {
            id: uuidv4(),
            title: "Contato",
            items: [
                {
                    id: uuidv4(),
                    text: "Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco: contato@wellingtoncimento.com"
                }
            ]
        },
    ]
    return (
        <ContentLayout title='Política de Privacidade'>
            <span>Última atualização: 27/09/2024</span>
            <span>Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao visitar nosso site {appName}. Sua privacidade é importante para nós. </span>
            {data.map((father, index) => (
                <div key={father.id}>
                    <SubHeading>{`${index + 1}. ${father.title}`}</SubHeading>
                    <DefaultList>
                        {father.items.map(child => (
                            <DefaultItemList key={child.id}>{child.text}</DefaultItemList>
                        ))}
                    </DefaultList>
                </div>
            ))}
        </ContentLayout>
    )
}

export default PrivacyPolicyPage