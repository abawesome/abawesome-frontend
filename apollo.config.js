module.exports = {
    client: {
        addTypename: true,
        url: 'https://abawesome-rel-staging.azurewebsites.net/graphql',
        includes: ['./src/**'],
        service: {
            name: 'abawesome-backend',
            // localSchemaFile: './schema.json',
        },
    },
};
