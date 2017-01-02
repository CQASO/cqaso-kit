const compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

export default compose;
