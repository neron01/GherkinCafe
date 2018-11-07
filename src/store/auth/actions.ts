import { INuxtActionTree, IRootState } from '../types';
import { IUser, IUserState } from './types';

export const actions: INuxtActionTree<IUserState, IRootState> = {
    async login({ commit }, { email, password }: { email: string; password: string }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        try {
            const data: IUser = await this.$axios.$post('/api/auth/login', { email, password }); // TODO почини после
            commit('setUser', data);
        } catch (error) {
            throw new Error('Wrong email or password');
        }
    },
    async register({ commit }, { email, password }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        try {
            const data = await this.$axios.$post('/api/auth/register', { email, password });
            commit('setUser', data);
        } catch (error) {
            switch (error.response.status || 500) {
                case 409:
                    throw new Error('Such email is already registered');
                case 500:
                    throw new Error('Internal server error');
            }
        }
    },
    async logout({ commit }) {
        const data = await this.$axios.$post('/api/auth/logout');
        if (data.ok) {
            commit('setUser', null);
        }
    },
    async changePassword(
        { commit },
        { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    ) {
        if (!currentPassword || !newPassword) {
            throw new Error('All fields are required');
        }
        try {
            await this.$axios.$patch('/api/auth', { currentPassword, newPassword });
        } catch (error) {
            throw new Error('Wrong password');
        }
    },
};
