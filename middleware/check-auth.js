import axios from '~/plugins/axios';

export default async (ctx) => {
    if (process.server && !ctx.store.state.auth.authUser) {
        await axios.get('/api/auth/callback').then(response => {
            if (response.data.user) {
                ctx.store.commit('auth/SET_USER', response.data.user);
            } else {
                ctx.store.commit('auth/SET_USER', null);
            }
        },
        (error) => { console.log(error); });
    }
};
