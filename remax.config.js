/*
 * @Author: your name
 * @Date: 2020-09-24 19:02:37
 * @LastEditTime: 2020-09-24 19:14:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wx_mall\remax.config.js
 */
const less = require('@remax/plugin-less');
module.exports = {
  plugins: [
    less({
      lessOptions: {
        globalVars: {
          'primary-color': '"#4569d4"',
        },
      },
    }),
  ],
};