import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        axios.defaults.baseURL = process.env.BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    },
    PostRequest(url, data){
        return axios({
            method: 'POST',
            url: url,
            data: data,
            headers: {Authorization: 'Beareer +token'}
        })
    }
    
};
export default ApiService