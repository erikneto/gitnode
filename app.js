const createRepository = require('json-git').default;

// Create a repo
const repository = createRepository();

// First commit
repository.commit('user123', 'first commit on master', {
    intent: 'fruits',
    examples: [{
        text: 'banana',
        active: true
    }]
});

// Show master repository tree
console.log(1, 'master: ', repository.tree);

// Create a branch
repository.checkout('newVersion', true);
// Show  newVersion branch repository

console.log(2, 'newVersion: ', repository.tree);
console.log('Expected: the same of tree of master');

// Add a new fruit 'laranja'
repository.commit('userXPTO', 'second commit on newVersion branch', {
    intent: 'fruits',
    examples: [{
        text: 'banana',
        active: true
    }, {
        text: 'laranja',
        active: true
    }]
});


console.log(3, 'newVersion: ', repository.tree);
console.log('Expected: newVersion branch has two fruits... Laranja is the new one');

// Working on master
repository.checkout('master');
console.log(4, 'master: ', repository.tree);

// Add a new fruit 'pera' on master
repository.commit('user123', 'third commit on master - hotfix scenario', {
    intent: 'fruits',
    examples: [{
        text: 'banana',
        active: true
    }, {
        text: 'pera',
        active: true
    }]
});
console.log(5, 'master: ', repository.tree);
console.log('Expected: master branch has two fruits... Pera is the new one');

// Show diffs
const diffs = repository.diff('master', 'newVersion');
console.log(6, 'Diff: ',diffs);

// Apply diff
const result = repository.apply(diffs);
console.log(7, 'After apply diff: ', result);
repository.commit('userXPTO', 'fourth commit - merge on master', result);

console.log(8, 'master after merge: ', repository.tree);

// Show commits history
//console.log(8, repository.log);
