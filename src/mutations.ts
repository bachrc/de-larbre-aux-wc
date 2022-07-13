import {ApplicationState} from "./models";
import { newExtraction } from "./models/Extraction";


export enum MutationType {
ADD_EXTRACTION = "ADD_EXTRACTION",
ADD_TDS_TO_EXTRACTION = "ADD_TDS_TO_EXTRACTION",
UPDATE_POIDS_CAFE = "UPDATE_POIDS_CAFE",
UPDATE_POIDS_BOISSON = "UPDATE_POIDS_BOISSON",
UPDATE_TDS = "UPDATE_TDS",
REMOVE_TDS = "REMOVE_TDS",
DELETE_ALL_EXTRACTIONS = "DELETE_ALL_EXTRACTIONS",
DELETE_EXTRACTION = "DELETE_EXTRACTION",
UPDATE_EXTRACTION_NAME = "UPDATE_EXTRACTION_NAME"
}

interface UpdatePoidsParams {
    extractionId: string,
    poids: number
}

interface UpdateExtractionNameParams {
    extractionId: string,
    name: string
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

interface DeleteExtractionParams {
    extractionId: string
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
    },

    [MutationType.DELETE_ALL_EXTRACTIONS] (state: ApplicationState) {
        state.extractions = {}
    },

    [MutationType.UPDATE_EXTRACTION_NAME] (state: ApplicationState, payload: UpdateExtractionNameParams) {
        if(doesExtractionExist(state, payload.extractionId)) {
            state.extractions[payload.extractionId].name = payload.name
        }
    },

    [MutationType.DELETE_EXTRACTION] (state: ApplicationState, payload: DeleteExtractionParams) {
        delete state.extractions[payload.extractionId]
    }
}