const info = (...params) => {
    if (process.env.NODE_env !== 'test') {
        console.log(...params)
    }
}

module.exports = info