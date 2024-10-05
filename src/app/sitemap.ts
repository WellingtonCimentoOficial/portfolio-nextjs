import { BASE_URL } from '@/utils/requests';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: BASE_URL + '/',
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1
        },
        {
            url: BASE_URL + '/projects/0/ecmarket',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        },
        {
            url: BASE_URL + '/projects/1/smart-lamp-controller',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: BASE_URL + '/projects/2/magic-led-v2',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: BASE_URL + '/projects/3/flask_project01',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: BASE_URL + '/projects/4/u3a-bot',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: BASE_URL + '/projects/5/glozble',
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1
        },
        {
            url: BASE_URL + '/policies/terms-of-use',
            lastModified: new Date('2024-09-27'),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: BASE_URL + '/policies/privacy-policy',
            lastModified: new Date('2024-09-27'),
            changeFrequency: 'monthly',
            priority: 0.5
        },
    ]
}