import { Module } from 'vuex';
import { IRootState } from '../types';
// import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IUserState } from './types';

export const state: IUserState = {
    authUser: undefined
};

const namespaced: boolean = true;

export const auth: Module<IUserState, IRootState> = {
    // getters,
    actions,
    mutations,
    namespaced,
    state
};
