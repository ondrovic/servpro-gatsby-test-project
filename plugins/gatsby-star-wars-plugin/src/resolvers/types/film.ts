import { fetchUrl } from '../utils';

export const filmResolvers = {
    characters: {
        resolve: async (source: any) => {
            if (!source.characters?.length) return [];
            const characters = await Promise.all(
                source.characters.map((url: string) => fetchUrl(url))
            );
            return characters.filter(Boolean);
        },
    },
    planets: {
        resolve: async (source: any) => {
            if (!source.planets?.length) return [];
            const planets = await Promise.all(
                source.planets.map((url: string) => fetchUrl(url))
            );
            return planets.filter(Boolean);
        },
    },
    starships: {
        resolve: async (source: any) => {
            if (!source.starships?.length) return [];
            const starships = await Promise.all(
                source.starships.map((url: string) => fetchUrl(url))
            );
            return starships.filter(Boolean);
        },
    },
    vehicles: {
        resolve: async (source: any) => {
            if (!source.vehicles?.length) return [];
            const vehicles = await Promise.all(
                source.vehicles.map((url: string) => fetchUrl(url))
            );
            return vehicles.filter(Boolean);
        },
    },
    species: {
        resolve: async (source: any) => {
            if (!source.species?.length) return [];
            const species = await Promise.all(
                source.species.map((url: string) => fetchUrl(url))
            );
            return species.filter(Boolean);
        },
    },
};