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
});
