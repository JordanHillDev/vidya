import {
    ADD_PEER_STREAM,
    ADD_PEER_NAME,
    REMOVE_PEER_STREAM,
    ADD_ALL_PEERS,
    TOGGLE_SHARING_VIDEO,
    TOGGLE_SHARING_MIC,
} from "./peerActions";

export const peersReducer = (state, action) => {
    switch (action.type) {
        case ADD_PEER_STREAM:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    stream: action.payload.stream,
                },
            };
        case ADD_PEER_NAME:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    userName: action.payload.userName,
                },
            };
        case TOGGLE_SHARING_VIDEO:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    sharingVideo: action.payload.sharingVideo,
                },
            };
        case TOGGLE_SHARING_MIC:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    sharingMic: action.payload.sharingMic,
                },
            };
        case REMOVE_PEER_STREAM:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],

                    stream: undefined,
                },
            };
        case ADD_ALL_PEERS:
            return { ...state, ...action.payload.peers };
        default:
            return { ...state };
    }
};
