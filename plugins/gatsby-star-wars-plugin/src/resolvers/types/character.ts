import { fetchUrl } from "../utils";

export const characterResolvers = {
    films: {
        resolve: async (source: any) => {
            if (!source.films?.length) return [];
            const films = await Promise.all(
                source.films.map((url: string) => fetchUrl(url))
            );
            return films;
        },
    },
    species: {
        resolve: async (source: any) => {
            if (!source.species?.length) return [];
            const species = await Promise.all(
                source.species.map((url: string) => fetchUrl(url))
            );
            return species;
        },
    },
    vehicles: {
        resolve: async (source: any) => {
            if (!source.vehicles?.length) return [];
            const vehicles = await Promise.all(
                source.vehicles.map((url: string) => fetchUrl(url))
            );
            return vehicles;
        },
    },
    starships: {
        resolve: async (source: any) => {
            if (!source.starships?.length) return [];
            const starships = await Promise.all(
                source.starships.map((url: string) => fetchUrl(url))
            );
            return starships;
        },
    },
    homeworld: {
        resolve: async (source: any) => {
            if (!source.homeworld) return null;
            return fetchUrl(source.homeworld);
        },
    },
};