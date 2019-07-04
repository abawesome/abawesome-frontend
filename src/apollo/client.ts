import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { RefreshToken, RefreshTokenVariables } from './__generated__/RefreshToken';
import { FetchResult } from 'apollo-link';

const refreshHttpLink = createHttpLink({
    uri: 'http://localhost:8000/api/graphql',
});

export const refreshClient = new ApolloClient({
    link: refreshHttpLink,
    cache: new InMemoryCache(),
});

let refreshingPromise: Promise<string | undefined> | null = null;
// Create customFetch function for handling re-authorization
// This customFetch (or any fetch you pass to the link) gets uri and options as arguments. We'll use those when we actually execute a fetch.
const customFetch = (uri: string, options: RequestInit) => {
    // Create initial fetch, this is what would normally be executed in the link without the override
    var initialRequest = fetch(uri, options);
    return initialRequest.then(async response => {
        const json = await response.json();
        const responseCopy = { ...response };
        // We should now have the JSON from the response of initialRequest
        // We check that we do and look for errors from the GraphQL server
        // If it has the error 'User is not logged in' (that's our implementation of a 401) we execute the next steps in the re-auth flow
        if (json && json.errors && json.errors[0] && json.errors[0].message === 'User is not logged in.') {
            if (!refreshingPromise) {
                const refreshToken = localStorage.getItem('refresh-token');
                refreshingPromise = refreshClient
                    .mutate<RefreshToken, RefreshTokenVariables>({
                        mutation: gql`
                            mutation RefreshToken($refreshToken: String!) {
                                refreshToken(refreshToken: $refreshToken) {
                                    token
                                    refreshToken
                                }
                            }
                        `,
                        variables: { refreshToken: refreshToken || '' },
                    })
                    .then(response => {
                        if (
                            response.data &&
                            response.data.refreshToken &&
                            response.data.refreshToken.token &&
                            response.data.refreshToken.refreshToken
                        ) {
                            localStorage.setItem('access-token', response.data.refreshToken.token);
                            localStorage.setItem('refresh-token', response.data.refreshToken.refreshToken);
                            return response.data.refreshToken.token;
                        } else {
                            localStorage.removeItem('access-token');
                            localStorage.removeItem('refresh-token');
                            return undefined;
                        }
                    });
            }
            return refreshingPromise.then(newAccessToken => {
                console.log({ newAccessToken });
                // Now that the refreshing promise has been executed, set it to null
                refreshingPromise = null;
                if (options && options.headers) {
                    // Set the authorization header on the original options parameter to the new access token we got
                    options.headers['authorization'] = `JWT ${newAccessToken}`;
                }
                // Return the promise from the new fetch (which should now have used an active access token)
                // If the initialRequest had errors, this fetch that is returned below is the final result.
                return fetch(uri, options);
            });
        }

        // If there were no errors in the initialRequest, we need to repackage the promise and return it as the final result.
        return new Promise<Response>((resolve, reject) =>
            resolve({
                ...response,
                text: () => new Promise<string>((resolve, reject) => resolve(JSON.stringify(json))),
            }),
        );
    });
};

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/api/graphql',
    fetch: customFetch,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
