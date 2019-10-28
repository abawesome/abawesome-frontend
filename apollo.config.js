module.exports = {
    client: {
        addTypename: true,
        includes: ['./src/**'],
        service: {
            name: 'abawesome-backend',
            localSchemaFile: './schema.json',
        },
    },
};
