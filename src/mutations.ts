import { ApplicationState, Extraction } from "./models";

export enum MutationType {
    ADD_EXTRACTION
}

export const mutations = {
    [MutationType.ADD_EXTRACTION] (state: ApplicationState): ApplicationState {
        return {
            ...state,
            extractions: [
                ...state.extractions,
                new Extraction()
            ]
        }
    }
}