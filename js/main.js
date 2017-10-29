requirejs.config({
    baseUrl: 'dist/js',
    paths: {
        jquery: 'libs/jquery',
        lodash: 'libs/lodash'
    }
});

requirejs(['modules/loader', 'modules/register', 'lodash'], (loader, register, _) => {
    loader.subscribe({
        progress: (v, max) => _.noop,
        done: (files) => console.log(files)
    });

    console.log(register);

    document.write(`
        1|2 - ${1 | 2}
        1|4 - ${1 | 4}
        1|8 - ${1 | 8}
        2|4 - ${2 | 4}
        2|8 - ${2 | 8}
        4|8 - ${4 | 8}
    `);
});
