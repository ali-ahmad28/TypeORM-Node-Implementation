module.exports={
    preset:"test-jest",
    testEnvironment:"node",
};

module.exports={
    roots:["<rootDir>/src"],
    testMatch:[
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],

    transform:{
        "^.+\\.(ts|tsx)$":"ts-jest",
    },
    testTimeout:20000,
};