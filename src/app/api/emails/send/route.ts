import { NextResponse } from "next/server";

type Data = {
    firstName: string | null
    lastName: string | null
    email: string | null
    message: string | null
    recaptchaToken: string | null
}

type SendEmailType = {
    firstName: string
    lastName: string
    email: string
    message: string
    recaptchaToken: string
}

type TemplateParamsType = {
    user_id: string
    service_id: string
    template_id: string
    template_params: {
        name: string,
        email: string,
        message: string
        'g-recaptcha-response': string
    }
}

const sendEmail = async ({firstName, lastName, email, message, recaptchaToken} : SendEmailType) => {
    const userId =  process.env.NEXT_PRIVATE_EMAILJS_PUBLIC_KEY ?? ''
    const serviceID = process.env.NEXT_PRIVATE_EMAILJS_SERVICE_ID ?? ''
    const templateID = process.env.NEXT_PRIVATE_EMAILJS_TEMPLATE_ID ?? ''

    const data: TemplateParamsType = {
        service_id: serviceID,
        template_id: templateID,
        user_id: userId,
        template_params: {
            name: `${firstName} ${lastName}`,
            email,
            message,
            'g-recaptcha-response': recaptchaToken
        }
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Origin': process.env.NEXT_PUBLIC_DOMAIN_URL ?? '',
            "Host": new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ?? '').hostname,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        },
        method: "POST",
        body: JSON.stringify(data)
    })

    if(response.status !== 200){
        throw new Error('Failed to send email')
    }

    return response
}

export async function POST(request: Request, context: any) {
    const {firstName, lastName, email, message, recaptchaToken}: Data = await request.json()

    if((firstName && firstName.length > 3) && 
        (lastName && lastName.length > 3) && 
        (email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) && 
        (message && message.length > 10) &&
        recaptchaToken
    ){
        try {
            await sendEmail({firstName, lastName, email, message, recaptchaToken})
            return NextResponse.json(null, { status: 200 })
        } catch (error) {
            return NextResponse.json(null, { status: 500 })
        }
    }

    return NextResponse.json(null, { status: 400 })
}