import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Query {
		orders: [Order!]!
	}

	input InputOrder {
		name: String!
		phone: String!
		arrivalDate: String!
		airport: String!
		flightNumber: String!
	}

	type Order {
		id: ID!
		name: String!
		phone: String!
		arrivalDate: String!
		airport: String!
		flightNumber: String!
	}

	type Mutation {
		createOrder(order: InputOrder!): Order!
	}
`;
