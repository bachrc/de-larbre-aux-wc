import {ApplicationState, Extraction, newExtraction} from "./models";


export enum MutationType {
ADD_EXTRACTION = "ADD_EXTRACTION",
ADD_TDS_TO_EXTRACTION = "ADD_TDS_TO_EXTRACTION",
UPDATE_POIDS_CAFE = "UPDATE_POIDS_CAFE",
UPDATE_POIDS_BOISSON = "UPDATE_POIDS_BOISSON",
UPDATE_TDS = "UPDATE_TDS",
REMOVE_TDS = "REMOVE_TDS"
}

interface UpdatePoidsParams {
    extractionId: string,
    poids: number
}

interface UpdateTdsParams {
    extractionId: string,
    index: number,
    value: number
}

interface RemoveTdsParams {
    extractionId: string,
    index: number
}

function doesExtractionExist(state: ApplicationState, extractionId: string) {
    return extractionId in state.extractions
}

export const mutations = {
    [MutationType.ADD_EXTRACTION] (state: ApplicationState) {
        let extraction = newExtraction();

        state.extractions[extraction.id] = extraction;
    },

    [MutationType.ADD_TDS_TO_EXTRACTION] (state: ApplicationState, extractionId: string) {
        state.extractions[extractionId]?.relevesTDS.push(0)
    },

    [MutationType.UPDATE_POIDS_BOISSON] (state: ApplicationState, payload: UpdatePoidsParams) {
        if(doesExtractionExist(state, payload.extractionId)) {
            state.extractions[payload.extractionId].poidsBoisson = payload.poids
        }
    },

    [MutationType.UPDATE_POIDS_CAFE] (state: ApplicationState, payload: UpdatePoidsParams) {
        if(doesExtractionExist(state, payload.extractionId)) {
            state.extractions[payload.extractionId].poidsCafe = payload.poids
        }
    },

    [MutationType.UPDATE_TDS] (state: ApplicationState, payload: UpdateTdsParams) {
        if(doesExtractionExist(state, payload.extractionId)) {
            let extraction = state.extractions[payload.extractionId];
            if(extraction.relevesTDS.length > payload.index) {
                extraction.relevesTDS[payload.index] = payload.value
            }
        }
    },

    [MutationType.REMOVE_TDS] (state: ApplicationState, payload: RemoveTdsParams) {
        if(doesExtractionExist(state, payload.extractionId)) {
            let extraction = state.extractions[payload.extractionId];
            if(extraction.relevesTDS.length > payload.index) {
                console.log(extraction.relevesTDS)
                extraction.relevesTDS.splice(payload.index, 1)
                console.log(extraction.relevesTDS)
            }
        }
    }
}

