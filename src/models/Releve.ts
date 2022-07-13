import { Extraction } from "./Extraction";

export interface Releve {
    releveTds: number;
    yield: number;
}

export function from(extraction: Extraction, valeurReleve: number): Releve {
    return {
        releveTds: valeurReleve,
        yield: computeYield(extraction.poidsCafe, extraction.poidsBoisson, valeurReleve)
    }
}

export function computeYield(poidsCafe: number, poidsBoisson: number, tds: number): number {
    return tds * (poidsBoisson / poidsCafe)
}

