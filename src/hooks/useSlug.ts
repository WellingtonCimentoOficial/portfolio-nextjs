export const useSlug = () => {
    const slugify = (text: string) => {
        return text
        .toString() // Converte para string
        .toLowerCase() // Converte para minúsculas
        .trim() // Remove espaços em branco no início e no fim
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/[^\w\-]+/g, '') // Remove caracteres especiais
        .replace(/\-\-+/g, '-') // Remove hífens duplicados
    }
    return {slugify}
}