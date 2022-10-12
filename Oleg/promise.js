class OwnPromise {
    data;
    thenStack = [];

    constructor(fn){
        fn(this.resolve.bind(this));
    }

    resolve(data){
        this.data = data;

        this.thenStack.forEach(({fn, pr}) => {
            const res = fn(data);
            pr._force(res);

        })
    }

    _force(data){
        this.resolve(data);
    }

    then(fn){
        const pr = new OwnPromise((resolve) =>  {});

        this.thenStack.push({
            fn,
            pr
        });

        return pr;
    }
}


const p2 = new OwnPromise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
});

p2.then((value) => {
    console.log(value); // 1
    return value + 1;
}).then((value) => {
    console.log(value, " - A synchronous value works"); // 2 - A synchronous value works
    return 5;
}).then((value) => {
    console.log(value); // 5
    return value + 1;
})


p2.then((value) => {
    console.log(value); // 1
});

