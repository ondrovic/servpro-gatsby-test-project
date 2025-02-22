interface APIResponse {
    results: any[];
    next: string | null;
    previous: string | null;
}

const baseUrl = process.env.GATSBY_API_URL;

/**
 * Fetch data from a given URL.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object|null>} The fetched data as a JSON object, or null if an error occurred.
 */
export async function fetchUrl(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return null;
    }
}

/**
 * Fetch all pages of data from a given API endpoint.
 * 
 * @param {string} baseUrl - The base URL of the API.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<any[]>} The fetched data as an array of results.
 */
export async function fetchAllPages(baseUrl: string, endpoint: string): Promise<any[]> {
    let currentUrl: string | null = `${baseUrl}/${endpoint}/`;
    let allResults: any[] = [];

    while (currentUrl !== null) {
        try {
            const response = await fetch(currentUrl);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data: APIResponse = await response.json();
            allResults = [...allResults, ...data.results];
            currentUrl = data.next;
        } catch (error) {
            console.error(`Error fetching from ${currentUrl}:`, error);
            break;
        }
    }

    return allResults;
}

export async function fetchFromApi(endpoint: string, id?: string) {
    if (!baseUrl) {
        throw new Error('GATSBY_API_URL is not defined');
    }

    if (id) {
        const url = `${baseUrl}/${endpoint}/${id}/`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            return null;
        }
    }

    return fetchAllPages(baseUrl, endpoint);
}