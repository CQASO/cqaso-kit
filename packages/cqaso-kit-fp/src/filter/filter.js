
import curry from '../_helper/curry.js';

const filter = curry((fn, arr) => arr.filter(fn));

export default filter;
