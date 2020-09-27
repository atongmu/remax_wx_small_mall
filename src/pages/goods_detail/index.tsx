import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Video, Swiper, SwiperItem, getSystemInfo, getStorageSync, setStorageSync, switchTab } from 'remax/wechat';
import { Stepper, Popup, Button, Icon, Tag } from 'anna-remax-ui';
import { usePageEvent } from 'remax/macro';
import { usePageInstance } from 'remax'

import './index.less';
import { href } from '@/utils/common'
import page_path from '@/utils/page_path';
import GroupTitle from '@/components/group_title';
import PageLoading from '@/components/page_loading';
import { toast } from '../../utils/common';

export interface Items {
  id: number,
  banners: Array<{ type: string, url: string }>,
  title: string,
  pack: boolean,
  newPrice: string,
  originalPrice: string,
  content: string,
  sku: Array<{ key: string, value: string, image: string }>,
  commont: Array<{ id: number, name: string, head_image: string, text: string }>,
  sales: number,
  delivery: number,
  city: string,
}
export interface GoodsSku {
  key: string,
  value: string,
  image: string
}
export default () => {
  const videoRef = useRef()
  const page = usePageInstance();
  const [show, setShow] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [duration, setDuration] = useState(0)
  const [scrollH, setScrollH] = useState<number>(0)
  const [changeGoods, setChangeGoods] = useState<GoodsSku>({
    key: '1',
    value: '1',
    image: '/image/mall/banner/11.jpg'
  })
  const [num, setNum] = React.useState(1);
  const [goodsInfo, setGoodsInfo] = useState<Items>({
    id: 0,
    banners: [
      { type: 'image', url: '/image/mall/banner/11.jpg' },
      { type: 'image', url: '/image/mall/banner/33.jpg' },
      { type: 'image', url: '/image/mall/banner/55.jpg' },
    ],
    title: '谈判官明星同款耳坠韩国气质简约显脸瘦的耳环女百搭个性长款耳钉 个性水滴耳环【A2】',
    pack: false,
    newPrice: '99.00',
    originalPrice: '199.00',
    content: '内容',
    sku: [],
    commont: [],
    sales: 0,
    delivery: 0,
    city: '',
  })

  usePageEvent('onShow', () => {
    init()
  });
  const init = async () => {
    const { windowWidth } = await getSystemInfo()
    setScrollH(windowWidth)
    setGoodsInfo({ ...goodsInfo, id: 1 })
  }
  const appendCart = () => {
    const cartItems = getStorageSync("cart")
    let goodsList = []
    if (cartItems) {
      goodsList = JSON.parse(cartItems)
      let inLine = false
      for (const item of goodsList) {
        if (item.id === goodsInfo.id && item.changeGoods.key === changeGoods.key) {
          item.num += num
          inLine = true
          break;
        }
      }
      if (inLine) {
        setStorageSync("cart", JSON.stringify(goodsList))
        return
      }
    }
    const goods = [{
      id: goodsInfo.id,
      name: goodsInfo.title,
      newPrice: goodsInfo.newPrice,
      sku: goodsInfo.sku,
      changeGoods: changeGoods,
      num: num,
      checked: true,
      show: false
    }]
    const storageGoods = JSON.stringify(goodsList.concat(goods))
    setStorageSync("cart", storageGoods)
    wx.setTabBarBadge({
      index: 2,
      text: '1'
    })
  }
  // 收藏
  const packChange = () => {
    const info = Object.assign({}, goodsInfo)
    info.pack = !goodsInfo.pack
    setGoodsInfo(e => info)
  }
  if (goodsInfo.id === 0) {
    return <PageLoading />
  }
  return (
    <View className="goods-info">
      <View style={{ position: 'relative' }}>
        <View>
          <Swiper autoplay={true} circular={true} onChange={(e) => setBannerIndex(e.detail.current)} style={{ height: `${scrollH * 2}` }}>
            {goodsInfo.banners.map((item, index) => {
              return (<SwiperItem key={index}>
                <Image src={item.url} style={{ width: "100%", height: "100%" }} />
              </SwiperItem>)
            })}
          </Swiper>
          <View style={{ position: 'absolute', bottom: '30', right: '0' }}>
            <Text style={{ padding: '10rpx 6rpx 10rpx 20rpx', borderRadius: '50rpx 0 0 50rpx', backgroundColor: 'rgba(0,0,0,.7)', color: '#ffffff' }}>{bannerIndex + 1}/{goodsInfo.banners.length}</Text>
          </View>
        </View>
      </View>
      <View>
        <View className="flex align-center padding-sm bg-white">
          <View className="flex-sub">
            <Text className="text-price text-red">
              <Text className="text-bold text-xxl">{goodsInfo.newPrice}</Text>
            </Text>
            <Text className="text-price text-through padding-left-sm">{goodsInfo.originalPrice}</Text>
          </View>
          <View className="text-center" onClick={packChange}>
            <View>
              {goodsInfo.pack ? (<Icon type="like" color="red" />) : (<Icon type="like" />)}
            </View>
            <View className={`text-sm ${goodsInfo.pack && 'text-red'}`}>收藏 </View>
          </View>
        </View>
        <View className="flex align-center padding-left-sm bg-white">
          <View className="flex-sub margin-right-sm">
            {goodsInfo.title}
          </View>
          <button open-type="share" className="contact">
            <View style={{ padding: '10rpx 6rpx 10rpx 20rpx', borderRadius: '50rpx 0 0 50rpx', backgroundColor: 'rgba(0,0,0,.1)' }}>
              <Icon type="share_light" /> 分享
          </View>
          </button>
        </View>
        <View className="text-gray  flex align-center padding-sm bg-white">
          <View className="flex-sub">已售：{goodsInfo.delivery}</View>
          <View className="flex-sub">仅剩:{goodsInfo.sales}</View>
          <View className="flex-sub">{goodsInfo.city}</View>
        </View>

        <View>
          <View className="padding-tb-sm">
            <GroupTitle text="详情" icon={false} />
          </View>
          <View className="bg-white padding-sm">
            <Text>{goodsInfo.content}</Text>
          </View>
        </View>
        <View className="safearea-bottom"></View>
      </View>

      <View className="bg-white padding-tb-xs solid-top foot">
        <View className="flex align-center padding-env">
          <View className="flex-sub flex">
            <View className="flex-sub text-center" onClick={() => switchTab({ url: page_path.mall })}>
              <View><Icon type="home_light" size="36" color="#8799a3" /></View>
              <View className="text-xs">首页</View>
            </View>
            <View className="flex-sub text-center" >
              <button open-type="contact" className="contact">
                <View><Icon type="service_light" size="36" color="#8799a3" /></View>
                <View className="text-xs">客服</View>
              </button>
            </View>
            <View className="flex-sub text-center" onClick={() => switchTab({ url: page_path.cart }).then((res: any) => {
              console.log(res)
            })}>
              <View><Icon type="cart_light" size="36" color="#8799a3" /></View>
              <View className="text-xs">购物车</View>
            </View>
          </View>
          <View className="flex-sub flex margin-right-sm">
            <View className="flex-sub">
              <Button look="orange" block onTap={() => appendCart()}>加入购物车</Button>
            </View>
            <View className="flex-sub margin-left-sm">
              <Button look="anna" block onTap={() => href(page_path.order_submit)}>立即购买</Button>
            </View>
          </View>
        </View>
      </View>
    </View >
  );
};
