import { MutationTree } from 'vuex';
import { IUser, IUserState } from './types';

export const mutations: MutationTree<IUserState> = {
    setUser (state: IUserState, user: IUser) {
        state.authUser = user;
    }
};

