import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"

export class Extraction {
    id: ExtractionId;
    name: string;
    poidsCafe: number;
    poidsBoisson: number;
    relevesTDS: number[];

    constructor() {
        this.id = uuidv4(),
        this.name = defaultName(),
        this.poidsCafe = 0,
        this.poidsBoisson = 0,
        this.relevesTDS = []
    }

    computeReleves(): Releve[] {
        return this.relevesTDS.map(releve => new Releve(releve, this.poidsCafe, this.poidsBoisson))
    }

    get yield(): number {
        return _.mean(this.computeReleves().map(releve => releve.yield))
    }
}

type ExtractionId = string;

export interface Extractions {
    [key: ExtractionId]: Extraction
}

export class Releve {
    poidsCafe: number;
    poidsBoisson: number;
    releveTds: number;

    constructor(releveTds: number, poidsCafe: number, poidsBoisson: number) {
        this.releveTds = releveTds;
        this.poidsCafe = poidsCafe;
        this.poidsBoisson = poidsBoisson;
    }

    get yield(): number {
        return this.releveTds * (this.poidsBoisson / this.poidsCafe)
    }
}

export class ApplicationState {
    extractions: Extractions = {}
}
function defaultName(): string {
    const today = new Date();
    return "Extraction du " + today.toLocaleDateString() + " à " + today.toLocaleTimeString();
}

