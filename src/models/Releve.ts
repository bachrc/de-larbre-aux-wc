import { Extraction } from "./Extraction";

export interface Releve {
    nom?: string,
    releveTds: number;
    yield: number;
}

export function from(extraction: Extraction, valeurReleve: number, nom?: string): Releve {
    return {
        releveTds: valeurReleve,
        yield: computeYield(extraction.poidsCafe, extraction.poidsBoisson, valeurReleve),
        nom
    }
}

export function computeYield(poidsCafe: number, poidsBoisson: number, tds: number): number {
    return tds * (poidsBoisson / poidsCafe)
}

