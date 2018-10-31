import { MutationTree } from 'vuex';
import { IUser, IUserState } from './types';

export const mutations: MutationTree<IUserState> = {
    SET_USER (state: IUserState, user: IUser) {
        state.authUser = user;
    }
};

