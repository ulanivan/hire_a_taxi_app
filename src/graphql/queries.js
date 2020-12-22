import gql from 'graphql-tag';

export const orderItemsQuery = gql`
	{
		orders @client {
			id
			airport
			arrivalDate
			name
			phone
			flightNumber
		}
	}
`;

export const addOrderMutation = gql`
	mutation($order: InputOrder!) {
		addOrder(order: $order) @client {
			name
			phone
			airport
		}
	}
`;
