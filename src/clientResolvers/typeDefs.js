import gql from 'graphql-tag';

export const typeDefs = gql`
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
		addOrder(order: InputOrder!): Order!
	}
`;
