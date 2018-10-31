import Vue from 'vue';
import ApexCharts from 'apexcharts';
import ApexChartsComponent from './ApexCharts.component.vue';

const VueApexCharts = ApexChartsComponent;

VueApexCharts.install = function (Vue) {
    // adding a global method or property
    Vue.ApexCharts = ApexCharts;

    // add the instance method
    Object.defineProperty(Vue.prototype, '$apexcharts', {
        get: function get () {
            return ApexCharts;
        }
    });
};

Vue.component('vue-apexcharts', {
    extends: VueApexCharts
});
