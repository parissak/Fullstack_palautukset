const info = (...params) => {
    if (process.env.NODE_env !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => {
    console.error('ERROR MESSAGE:', ...params)
}

module.exports = {
    info, error
}