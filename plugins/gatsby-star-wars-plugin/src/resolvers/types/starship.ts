import { fetchUrl } from "../utils";

export const starshipResolvers = {
    pilots: {
        resolve: async (source: any) => {
            if (!source.pilots?.length) return [];
            const pilots = await Promise.all(
                source.pilots.map((url: string) => fetchUrl(url))
            );
            return pilots.filter(Boolean);
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