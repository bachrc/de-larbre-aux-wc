import { v4 as uuidv4 } from 'uuid';

export type Extraction = {
    id: ExtractionId;
    poidsCafe: number;
    poidsBoisson: number;
    relevesTDS: number[];
}

type ExtractionId = string;

export interface Extractions {
    [key: ExtractionId]: Extraction
}

export function newExtraction(): Extraction {
    return {
        id: uuidv4(),
        poidsCafe: 0,
        poidsBoisson: 0,
        relevesTDS: []
    }
}

export class ApplicationState {
    extractions: Extractions = {}
}
