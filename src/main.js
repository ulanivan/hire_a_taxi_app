import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './clientResolvers/typeDefs';
import { resolvers } from './clientResolvers/resolvers';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql'
});

const cache = new InMemoryCache();
cache.writeData({
	data: { orders: [] }
});

const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
	typeDefs,
	resolvers
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient
});

new Vue({
	vuetify,
	apolloProvider,
	render: (h) => h(App)
}).$mount('#app');
