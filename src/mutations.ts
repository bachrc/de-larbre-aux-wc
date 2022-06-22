import {ApplicationState, Extraction, newExtraction} from "./models";

export enum MutationType {
    ADD_EXTRACTION = "ADD_EXTRACTION"
}

function addExtraction(state: ApplicationState) {
    let extraction = newExtraction();

    state.extractions[extraction.id] = extraction;
}

export const mutations = {
    [MutationType.ADD_EXTRACTION] (state: ApplicationState) {
        console.log(state)
        addExtraction(state)
    }
}
