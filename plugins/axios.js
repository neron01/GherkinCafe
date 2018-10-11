import * as axios from 'axios';
import https from 'https';

let options = {};
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`;
}
options.httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

export default axios.create(options);
