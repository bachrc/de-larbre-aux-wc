import { Extraction } from './Extraction';
    
export interface Extractions {
    [key: string]: Extraction
}

export class ApplicationState {
    extractions: Extractions = {}
}
