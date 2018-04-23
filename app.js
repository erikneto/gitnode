const createRepository = require('json-git').default;

const repository = createRepository();

repository.commit('user123', 'first commit', {
    intent: 'fruits',
    examples: [{
        text: 'banana',
        active: true
    }]
});

console.log(1, 'master', repository.tree);

repository.checkout('newVersion', true);

repository.commit('user123', 'second commit', {
    intent: 'fruits',
    examples: [{
        text: 'banana',
        active: true
    }, {
        text: 'laranja',
        active: true
    }]
});

console.log(2, 'newVersion', repository.tree);

repository.checkout('master');
console.log(3, 'master', repository.tree);

repository.commit('user123', 'third commit', {
    intent: 'fruits',
    examples: [{
        text: 'banana',
        active: true
    }, {
        text: 'pera',
        active: true
    }]
});
console.log(4, 'master', repository.tree);

const diffs = repository.diff('master', 'newVersion');
console.log(5, diffs);

repository.apply(diffs);
console.log(6, 'master', repository.tree);