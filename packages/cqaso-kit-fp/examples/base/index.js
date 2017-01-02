import fp from '../../src/fp.js';

const arr = [
    {name: 'cyt', id: '0'},
    {name: 'cyt1', id: '1'},
    {name: 'cyt2', id: '2'},
];


const formatArr = fp.map(value => ({name: value.name}));
const filterArr = fp.filter(value => value.name !== 'cyt2');

const result =
fp.compose(
    formatArr,
    filterArr,
)(arr);

console.log(result);
