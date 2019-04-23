module.exports = (config, env) => {
    config.output.globalObject = "this"

    config.module.rules.push({
        test: /\.worker.js$/,
        loader: "worker-loader"
    })

    return config
}
