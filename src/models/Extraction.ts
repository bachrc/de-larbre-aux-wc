
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import { Releve, from } from './Releve';


export interface Extraction {
    id: string;
    name: string;
    commentaire: string;
    poidsCafe: number;
    poidsBoisson: number;
    relevesTDS: number[];
}

export function newExtraction(): Extraction {
    return {
        id : uuidv4(),
        name : defaultName(),
        commentaire: "",
        poidsCafe : 0,
        poidsBoisson : 0,
        relevesTDS : []
    }
}

export function averageReleve(extraction: Extraction) : Releve {
    return {
        nom: extraction.name,
        releveTds: _.mean(extraction.relevesTDS),
        yield: computeYield(extraction)
    }
}

export function computeYield(extraction: Extraction): number {
    return _.mean(computeReleves(extraction)
            .map(releve => releve.yield)
        )
}

export function computeReleves(extraction: Extraction): Releve[] {
    return extraction.relevesTDS
        .map(releve => from(extraction, releve))

}

function defaultName(): string {
    const today = new Date();
    return "Extraction du " + today.toLocaleDateString() + " à " + today.toLocaleTimeString();
}
