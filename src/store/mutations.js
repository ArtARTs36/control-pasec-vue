// https://vuex.vuejs.org/en/mutations.html
import * as TYPES from './types';

/* eslint-disable no-param-reassign */
export default {
  [TYPES.MAIN_SET_FETCHING](state, obj) {
    state.fetching = obj.fetching;
  },
  [TYPES.MAIN_SET_MESSAGE](state, obj) {
    state.messages[obj.type] = obj.message;
  },
  [TYPES.MAIN_SET_OVERLAY](state) {
    state.overlay = !state.overlay;
  },
  // [TYPES.MAIN_SET_SUPPORT_OVERLAY](state) {
  //   state.supportOverlay = !state.supportOverlay;
  // },
  [TYPES.MAIN_SET_CREATE_STATE](state) {
    state.modalCreateState = !state.modalCreateState;
  },
  [TYPES.MAIN_SET_EDIT_STATE](state) {
    state.modalEditState = !state.modalEditState;
  },
  [TYPES.MAIN_SET_DELETE_STATE](state) {
    state.modalDeleteState = !state.modalDeleteState;
  },
  [TYPES.IS_SIDEBAR_ACTIVE](state) {
    state.isSidebarActive = !state.isSidebarActive;
  },
};
