function curry(fn) {
    return function (...args) {
        return fn.bind(null, ...args);
    };
}

export default curry;
