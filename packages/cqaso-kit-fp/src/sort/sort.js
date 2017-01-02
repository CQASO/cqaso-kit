
import curry from '../_helper/curry.js';

const sort = curry((fn, arr) => arr.sort(fn));

export default sort;
