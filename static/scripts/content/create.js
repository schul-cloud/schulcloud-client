import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueConfig from 'vue-config';
import VueResource from 'vue-resource';

import 'vue-material/dist/vue-material.min.css';

const configFile = require('./config');

const configs = configFile.configs;
Vue.use(VueConfig, configs);

Vue.use(VueMaterial);
Vue.use(VueResource);

Vue.config.devtools = true;


import GenerateContent from './../../vue-components/GenerateContent.vue';

var vm = new Vue({
	el: '#app',
	template: '<GenerateContent :userId="userId" />',
	components: { GenerateContent },
	data: { userId: null, content: '' },
	beforeMount: function () {
		this.userId = this.$el.attributes['data-user-id'].value;
  },
})
