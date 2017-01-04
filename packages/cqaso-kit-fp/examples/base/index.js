import fp from '../../src/fp.js';

const arr = [
    {name: 'cyt', id: '0'},
    {name: 'cyt1', id: '1'},
    {name: 'cyt1', id: '1'},
    {name: 'cyt2', id: '2'},
];


const formatArr = fp.map(value => value.name);
const filterArr = fp.filter(value => value !== 'cyt2');
const sliceArr = fp.slice([1, 3]);


const result =
fp.compose(
    formatArr,
    filterArr,
    sliceArr,
    fp.unique
)(arr);

console.log(result);
