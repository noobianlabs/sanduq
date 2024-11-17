import { GraphQLClient } from '@opencollective/api';

const client = new GraphQLClient({
  apiKey: process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_API_KEY,
});

export const getCollectives = async () => {
  const query = `
    query {
      account(slug: "${process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_SLUG}") {
        collectives {
          nodes {
            id
            name
            slug
            description
            stats {
              balance {
                value
              }
            }
          }
        }
      }
    }
  `;

  const result = await client.request(query);
  return result.account.collectives.nodes;
};

export const createCollective = async (name: string, description: string) => {
  const mutation = `
    mutation createCollective($name: String!, $description: String!) {
      createCollective(collective: {
        name: $name,
        description: $description,
        type: COLLECTIVE
      }) {
        id
        name
        slug
      }
    }
  `;

  const variables = { name, description };
  const result = await client.request(mutation, variables);
  return result.createCollective;
};

export const contributeToCollective = async (collectiveId: string, amount: number) => {
  const mutation = `
    mutation createOrder($amount: Int!, $collectiveId: String!) {
      createOrder(order: {
        fromAccount: { id: "${process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_SLUG}" },
        toAccount: { id: $collectiveId },
        amount: { value: $amount, currency: "USD" },
        description: "Contribution to Sanduq"
      }) {
        id
        amount {
          value
        }
      }
    }
  `;

  const variables = { amount, collectiveId };
  const result = await client.request(mutation, variables);
  return result.createOrder;
};