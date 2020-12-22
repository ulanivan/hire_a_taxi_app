import { orderItemsQuery } from '../graphql/queries';

export const resolvers = {
	Mutation: {
		addOrder: (_, { order }, { cache }) => {
			const data = cache.readQuery({ query: orderItemsQuery });
			const newOrderItem = {
				__typename: 'Order',
				...order
			};
			data.orders = [newOrderItem, ...data.orders];
			cache.writeQuery({ query: orderItemsQuery, data });
			return newOrderItem;
		}
	}
};
