
import curry from '../_helper/curry.js';

const slice = curry((params, arr) => arr.slice(...params));

export default slice;
