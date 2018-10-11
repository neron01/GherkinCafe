const axios = require('axios');

const state = () => ({
    authUser: null
});

const mutations = {
    SET_USER: function (state, user) {
        state.authUser = user;
    }
};

const actions = {
    async login ({ commit }, { email, password }) {
        if (!email || !password) throw new Error('Email and password are required');
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            commit('SET_USER', data);
        } catch (error) {
            throw new Error('Wrong email or password');
        }
    },
    async register ({ commit }, { email, password }) {
        if (!email || !password) throw new Error('Email and password are required');
        try {
            const { data } = await axios.post('/api/auth/register', { email, password });
            commit('SET_USER', data);
        } catch (error) {
            switch (error.response.status || 500) {
                case 409: throw new Error('Such email is already registered');
                case 500: throw new Error('Internal server error');
            }
        }
    },
    async logout ({ commit }) {
        const { data } = await axios.post('/api/auth/logout');
        if (data.ok) commit('SET_USER', null);
    },
    async changePassword ({ commit }, { currentPassword, newPassword }) {
        if (!currentPassword || !newPassword) throw new Error('All fields are required');
        try {
            await axios.patch('/api/auth', { currentPassword, newPassword });
        } catch (error) {
            throw new Error('Wrong password');
        }
    }
};

export default {
    state,
    // getters,
    mutations,
    actions,
};
