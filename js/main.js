requirejs.config({
    baseUrl: 'dist/js',
    paths: {
        jquery: 'libs/jquery',
        lodash: 'libs/lodash'
    }
});

requirejs(['modules/loader'], (loader) => {
    loader.subscribe({
        progress: (v, max) => console.log(v, max),
        done: (files) => console.log(files)
    });
});
