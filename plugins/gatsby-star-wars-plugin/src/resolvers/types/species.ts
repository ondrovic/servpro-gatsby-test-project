import { fetchUrl } from '../utils';

export const speciesResolvers = {
    people: {
        resolve: async (source: any) => {
            if (!source.people?.length) return [];
            const people = await Promise.all(
                source.people.map((url: string) => fetchUrl(url))
            );
            return people.filter(Boolean);
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
    homeworld: {
        resolve: async (source: any) => {
            if (!source.homeworld) return null;
            return fetchUrl(source.homeworld);
        },
    },
};
