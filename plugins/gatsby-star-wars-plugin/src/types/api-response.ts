import { Character } from "./character";

export interface APIResponse {
    results: Character[];
    next: string | null;
}