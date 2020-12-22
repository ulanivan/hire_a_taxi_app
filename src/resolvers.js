import { Order } from './models/Order';

export const resolvers = {
	Query: {
		orders: () => Order.find()
	},
	Mutation: {
		createOrder: async (_, payload)=> {
			const order = new Order(payload.order);
			await order.save();
			return order;
		},
	}
};
