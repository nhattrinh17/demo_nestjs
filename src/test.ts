import User from './models/user';

export const test = async () => {
    if (process.env.SERVER_HOST) {
        await test1();
        // await test2();
        // await test3();
        // await test4();
        // await test5();
        // await test6();
        // await test7();
        // await test8();
        // await test9();
        // await test10();
    }
};

const test1 = async () => {
    const res = await User.findAll({});
    console.log(res);
};
