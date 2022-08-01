module.exports = {
    // plugins: {
    //     'autoprefixer': {
    //         browsers: ['last 2 version', '>1%', 'ios 7']
    //     },
    //     'postcss-pxtorem': {
    //         rootValue: 70,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
    //         propList: ['*']
    //     }
    // }
    plugins: () => [
        require('autoprefixer')({
            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
        })
    ]
}