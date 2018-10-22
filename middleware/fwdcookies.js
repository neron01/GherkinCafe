import axios from '~/plugins/axios';

export default function (ctx) {
    if (process.server) {
        axios.defaults.headers.common = {};
        if (!ctx.req) {
            return;
        }
        Object.keys(ctx.req.headers).map((key) => {
            axios.defaults.headers.common[key] = ctx.req.headers[key];
        });
    }
}
