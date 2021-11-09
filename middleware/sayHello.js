

const sayHelloMiddleware = (req, res, next) => {
    console.log(`Hello ${req?.body?.name}`);
    next();
}

module.exports = sayHelloMiddleware;