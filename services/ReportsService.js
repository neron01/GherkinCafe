import axios from '~/plugins/axios';

export default {
  fetchReports () {
    return axios.get('/api/reports');
  },
  // addNewPost (params) {
  //   return api().post('posts', params);
  // },
  // getPost (params) {
  //   return api().get(`posts/${params.id}`);
  // },
  // updatePost (params) {
  //   return api().put(`posts/${params.id}`, params);
  // },
  // deletePost (id) {
  //   return api().delete(`posts/${id}`);
  // }
};
