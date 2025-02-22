import { fetchUrl } from "../utils";

export const planetResolvers = {
    residents: {
        resolve: async (source: any) => {
            if (!source.residents?.length) return [];
            const residents = await Promise.all(
                source.residents.map((url: string) => fetchUrl(url))
            );
            return residents.filter(Boolean);
        },
    },
    films: {
        resolve: async (source: any) => {
            if (!source.films?.length) return [];
            const films = await Promise.all(
                source.films.map((url: string) => fetchUrl(url))
            );
            return films.filter(Boolean);
        },
    },
};