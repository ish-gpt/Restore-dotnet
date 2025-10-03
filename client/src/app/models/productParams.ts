export type ProductParam = {
    orderBy: string,
    searchTerm?: string,
    types: string[],
    brands: string[],
    pageNumber: number,
    pageSize: number
}