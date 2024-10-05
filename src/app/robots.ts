import { BASE_URL } from '@/utils/requests'
import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
        userAgent: '*',
        allow: '/',
        disallow: '',
        },
        sitemap: BASE_URL + '/sitemap.xml',
    }
}