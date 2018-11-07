import https from 'https'

export default function ({ $axios }) {
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
    $axios.onError(error => {
        console.table(error);
        throw error.response;
    })
}
