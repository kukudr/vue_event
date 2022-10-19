/* eslint-disable indent */
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        // 在生产环境中 bulid  去除报错：
        // Unexpected console statement (no-console) 去除 console 中的插件
        'transform-remove-console'
    ]
}
