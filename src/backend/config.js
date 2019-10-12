const env = process.env.NODE_ENV;

const dev = {
    app: {
        port: 8080
    },
    db: {
        host: 'localhost',
        port: 5000,
        db: 'postgres',
        user: 'postgres',
        password: '12345'
    }
};

const test = {

};

const prod = {

};

const config = {
    dev
};

module.exports = config[env];