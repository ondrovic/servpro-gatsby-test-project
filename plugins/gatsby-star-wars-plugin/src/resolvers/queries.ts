import { fetchFromApi } from './utils'

type QueryArgs = {
    limit?: number;
    id?: string;
};

export const queryResolvers = {
    Query: {
        // Character Resolvers
        allCharacter: {
            type: 'CharacterConnection!',
            args: {
                limit: 'Int'
            },
            
            resolve: async (source: any, args: QueryArgs) => {
                const results = await fetchFromApi('people');
                const nodes = args.limit ? results.slice(0, args.limit) : results;
                return { nodes };
            },
        },
        character: {
            type: 'Character',
            args: {
                id: 'ID!'
            },
        
            resolve: async (source: any, args: QueryArgs) => {
                return fetchFromApi('people', args.id);
            },
        },

        // Vehicle Resolvers
        allVehicle: {
            type: 'VehicleConnection!',
            args: { limit: 'Int' },
        
            resolve: async (source: any, args: QueryArgs) => {
                const results = await fetchFromApi('vehicles');
                const nodes = args.limit ? results.slice(0, args.limit) : results;
                return { nodes };
            },
        },
        vehicle: {
            type: 'Vehicle',
            args: { id: 'ID!' },
        
            resolve: async (source: any, args: QueryArgs) => {
                return fetchFromApi('vehicles', args.id);
            },
        },

        // Film Resolvers
        allFilm: {
            type: 'FilmConnection!',
            args: { limit: 'Int' },
        
            resolve: async (source: any, args: QueryArgs) => {
                const results = await fetchFromApi('films');
                const nodes = args.limit ? results.slice(0, args.limit) : results;
                return { nodes };
            },
        },
        film: {
            type: 'Film',
            args: { id: 'ID!' },
        
            resolve: async (source: any, args: QueryArgs) => {
                return fetchFromApi('films', args.id);
            },
        },

        // Planet Resolvers
        allPlanet: {
            type: 'PlanetConnection!',
            args: { limit: 'Int' },
        
            resolve: async (source: any, args: QueryArgs) => {
                const results = await fetchFromApi('planets');
                const nodes = args.limit ? results.slice(0, args.limit) : results;
                return { nodes };
            },
        },
        planet: {
            type: 'Planet',
            args: { id: 'ID!' },
        
            resolve: async (source: any, args: QueryArgs) => {
                return fetchFromApi('planets', args.id);
            },
        },

        // Species Resolvers
        allSpecies: {
            type: 'SpeciesConnection!',
            args: { limit: 'Int' },
        
            resolve: async (source: any, args: QueryArgs) => {
                const results = await fetchFromApi('species');
                const nodes = args.limit ? results.slice(0, args.limit) : results;
                return { nodes };
            },
        },
        species: {
            type: 'Species',
            args: { id: 'ID!' },
        
            resolve: async (source: any, args: QueryArgs) => {
                return fetchFromApi('species', args.id);
            },
        },

        // Starship Resolvers
        allStarship: {
            type: 'StarshipConnection!',
            args: { limit: 'Int' },
        
            resolve: async (source: any, args: QueryArgs) => {
                const results = await fetchFromApi('starships');
                const nodes = args.limit ? results.slice(0, args.limit) : results;
                return { nodes };
            },
        },
        starship: {
            type: 'Starship',
            args: { id: 'ID!' },
        
            resolve: async (source: any, args: QueryArgs) => {
                return fetchFromApi('starships', args.id);
            },
        },
    }
};