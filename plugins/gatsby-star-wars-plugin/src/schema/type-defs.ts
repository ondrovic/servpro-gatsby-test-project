export const typeDefs = `
    type Character implements Node {
        id: ID!
        birth_year: String
        created: String
        edited: String
        eye_color: String
        gender: String
        hair_color: String
        height: String
        mass: String
        name: String!
        skin_color: String
        url: String
        films: [Film] @link
        species: [Species] @link
        starships: [Starship] @link
        vehicles: [Vehicle] @link
        homeworld: Planet @link
    }

    type CharacterConnection {
        nodes: [Character!]!
    }

    type Film implements Node {
        id: ID!
        title: String!
        episode_id: Int
        opening_crawl: String
        director: String
        producer: String
        release_date: String
        created: String
        edited: String
        url: String
        characters: [Character] @link
        planets: [Planet] @link
        starships: [Starship] @link
        vehicles: [Vehicle] @link
        species: [Species] @link
    }

    type FilmConnection {
        nodes: [Film!]!
    }

    type Starship implements Node {
        id: ID!
        name: String!
        model: String
        starship_class: String
        manufacturer: String
        cost_in_credits: String
        length: String
        crew: String
        passengers: String
        max_atmosphering_speed: String
        hyperdrive_rating: String
        MGLT: String
        cargo_capacity: String
        consumables: String
        created: String
        edited: String
        url: String
        films: [Film] @link
        pilots: [Character] @link
    }

    type StarshipConnection {
        nodes: [Starship!]!
    }

    type Vehicle implements Node {
        id: ID!
        name: String!
        model: String
        vehicle_class: String
        manufacturer: String
        length: String
        cost_in_credits: String
        crew: String
        passengers: String
        max_atmosphering_speed: String
        cargo_capacity: String
        consumables: String
        created: String
        edited: String
        url: String
        films: [Film] @link
        pilots: [Character] @link
    }

    type VehicleConnection {
        nodes: [Vehicle!]!
    }

    type Species implements Node {
        id: ID!
        name: String!
        classification: String
        designation: String
        average_height: String
        average_lifespan: String
        eye_colors: String
        hair_colors: String
        skin_colors: String
        language: String
        created: String
        edited: String
        url: String
        homeworld: Planet @link
        people: [Character] @link
        films: [Film] @link
    }

    type SpeciesConnection {
        nodes: [Species!]!
    }

    type Planet implements Node {
        id: ID!
        name: String!
        diameter: String
        rotation_period: String
        orbital_period: String
        gravity: String
        population: String
        climate: String
        terrain: String
        surface_water: String
        created: String
        edited: String
        url: String
        residents: [Character] @link
        films: [Film] @link
    }

    type PlanetConnection {
        nodes: [Planet!]!
    }

    type Query {
        allCharacter(limit: Int): CharacterConnection!
        character(id: ID!): Character
        allFilm(limit: Int): FilmConnection!
        film(id: ID!): Film
        allStarship(limit: Int): StarshipConnection!
        starship(id: ID!): Starship
        allVehicle(limit: Int): VehicleConnection!
        vehicle(id: ID!): Vehicle
        allSpecies(limit: Int): SpeciesConnection!
        species(id: ID!): Species
        allPlanet(limit: Int): PlanetConnection!
        planet(id: ID!): Planet
    }
`;