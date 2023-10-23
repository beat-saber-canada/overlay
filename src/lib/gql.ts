import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(import.meta.env.OVERLAY_RELAY_URL);