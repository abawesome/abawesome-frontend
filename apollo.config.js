module.exports = {
    client: {
        addTypename: true,
        url: 'http://localhost:5001/graphql',
        includes: ['./src/**'],
        service: {
            name: 'abawesome-backend',
            // localSchemaFile: './schema.json',
        },
    },
};
