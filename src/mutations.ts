import {ApplicationState} from "./models/State";
import { newExtraction } from "./models/Extraction";
import { App } from "vue";


export enum MutationType {
ADD_EXTRACTION = "ADD_EXTRACTION",
ADD_TDS_TO_EXTRACTION = "ADD_TDS_TO_EXTRACTION",
UPDATE_POIDS_CAFE = "UPDATE_POIDS_CAFE",
UPDATE_POIDS_BOISSON = "UPDATE_POIDS_BOISSON",
UPDATE_TDS = "UPDATE_TDS",
REMOVE_TDS = "REMOVE_TDS",
DELETE_EXTRACTION = "DELETE_EXTRACTION",
UPDATE_EXTRACTION_NAME = "UPDATE_EXTRACTION_NAME",
UPDATE_EXTRACTION_COMMENTAIRE = "UPDATE_EXTRACTION_COMMENTAIRE",
RESTORE_STATE = "RESTORE_STATE"
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
interface UpdateCommentaireParams {
    extractionId: string,
    commentaire: string
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

    [MutationType.UPDATE_EXTRACTION_NAME] (state: ApplicationState, params: UpdateExtractionNameParams) {
        if(doesExtractionExist(state, params.extractionId)) {
            state.extractions[params.extractionId].name = params.name
        }
    },

    [MutationType.DELETE_EXTRACTION] (state: ApplicationState, params: DeleteExtractionParams) {
        delete state.extractions[params.extractionId]
    },

    [MutationType.UPDATE_EXTRACTION_COMMENTAIRE] (state: ApplicationState, payload: UpdateCommentaireParams) {
        if(doesExtractionExist(state, payload.extractionId)) {
            state.extractions[payload.extractionId].commentaire = payload.commentaire
        }
    },
    [MutationType.RESTORE_STATE] (state: ApplicationState, stateToRestore: string) {
        state.extractions = (JSON.parse(stateToRestore) as ApplicationState).extractions
    }
}