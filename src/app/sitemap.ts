import { BASE_URL, getProjects } from '@/utils/requests';
import { slugify } from '@/utils/slugify';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getProjects()

    const projectsEntries: MetadataRoute.Sitemap = projects.map(project => ({
        url: BASE_URL + `/projects/${project.id}/${slugify(project.title)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1
    }))

    const sitemapEntries: MetadataRoute.Sitemap = [
        {
            url: BASE_URL + '/',
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
        ...projectsEntries,
    ]

    return sitemapEntries
}