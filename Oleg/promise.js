/**
 * Напишите реализацию собственного промиса
 */

class OwnPromise {
    thenStack = [];
    status = 0;
    data;

    constructor(fn){
        fn && fn(this.resolve.bind(this));
    }

    resolve(data){
        this.status = 1;
        this.data = data;
        this.thenStack.forEach(({fn, pr}) => {
            const res = fn(this.data);
            pr.resolve(res);
        })
    }

    then(fn){
        const pr = new OwnPromise();

        if(this.status === 1){
            const res = fn(this.data);
            pr.resolve(res);
        } else {
            this.thenStack.push({
                fn,
                pr
            });
        }

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

