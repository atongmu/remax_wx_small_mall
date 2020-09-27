/*
 * @Author: your name
 * @Date: 2020-09-24 19:02:37
 * @LastEditTime: 2020-09-27 20:52:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remax_wx_mall\src\app.config.ts
 */
import { AppConfig } from "remax/wechat";
const backgroundColor: string = '#f77';
const title: string = '便捷超市';
const pages: Array<string> = [
  'pages/index/index',
  'pages/login/index',
  'pages/cart/index',
  'pages/my/index',
  'pages/goods_sort/index',
  'pages/goods_detail/index',
  'pages/order_list/index',
  'pages/order_submit/index',
  'pages/order_detail/index',
  'pages/search/index',
  'pages/qrcode/index',
  'pages/success/index',
  'pages/error/index',
]

const config: AppConfig = {
  pages,
  tabBar: {
    color: '#8a8a8a',
    selectedColor: "#cf7777",
    backgroundColor: "#fff",
    list: [
      {
        text: '首页',
        iconPath:'image/tabbar/home.png',
        selectedIconPath:'image/tabbar/home_active.png',
        pagePath: 'pages/index/index',
      },
      {
        text: '分类',
        iconPath:'image/tabbar/all.png',
        selectedIconPath:'image/tabbar/all_active.png',
        pagePath: 'pages/goods_sort/index',
      },
      {
        text: '购物车',
        iconPath:'image/tabbar/cart.png',
        selectedIconPath:'image/tabbar/cart_active.png',
        pagePath: 'pages/cart/index',
      },
      {
        text: '我的',
        iconPath:'image/tabbar/my.png',
        selectedIconPath:'image/tabbar/my_active.png',
        pagePath: 'pages/my/index',
      },
    ]
  },
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: backgroundColor
  }
};

export default config;