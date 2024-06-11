export async function FetchApi(url ,options) {
    try {
        const res = await fetch(url, options)
        return res.json()
    } catch (error) {
        throw new Error(`Erro con la data ${error.message}`)
    }
}