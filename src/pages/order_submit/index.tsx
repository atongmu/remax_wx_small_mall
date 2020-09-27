import React, { useEffect, useState } from 'react';
import { View, Text, Image, getStorageSync } from 'remax/wechat';
import { Cell, Icon, Button, Input } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import OrderModel from '@/components/order_model';
import page_path from '@/utils/page_path';
import GoodsModel from '../../components/goods_model/index';
import InputModel from '@/components/input_model';

export interface GoodsModel {
  id: number,
  name: string,
  newPrice: string,
  content: string,
  changeGoods: { key: string, value: string, image: string },
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [orderItems, setOrderItems] = useState<GoodsModel[]>([])

  useEffect(() => {
    const setFun = setTimeout(() => {
      init()
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  const init = () => {
    const cartItems = getStorageSync("cart")
    if (cartItems) {
      setOrderItems(item => JSON.parse(cartItems))
    }
  }
  return (
    <View>
      {isLoading ? (
        <PageLoading />
      ) : (
          <View className="margin-top-sm">
            <View className="bg-white margin-bottom-sm padding" style={{ position: 'relative' }}>
              <View className="align-center">
                <InputModel label="提货人" placeholder="请输入提货人" />
                <InputModel label="手机号" placeholder="请输入手机号" />
                <View className="margin-top-sm text-gray text-xs">
                  <View>店长信息：憨憨</View>
                  <View>提货地点：憨憨小区</View>
                </View>
              </View>
              <View className="bg-img"></View>
            </View>
            <View className="bg-white">
              <View className="padding solid-bottom">
                信息
              </View>
              <View className="padding">
                {orderItems && (
                  orderItems.map((item, index) => {
                    return (
                      <OrderModel key={index} item={item} detail={() => console.log(item)} />
                    )
                  })
                )}
              </View>
              <View>
                <Input label="备注" placeholder="选填：请先和商家协商一致" />
                <Cell border={false}><View className="text-black">合计：<Text className="text-price text-red text-xl">111</Text></View></Cell>
              </View>
              <View className="safearea-bottom"></View>
            </View>
            <View className="foot">
              <View className="flex align-center bg-white padding-env">
                <View className="flex-sub text-center">
                  总额：<Text className="text-price text-red text-xl">1111</Text>
                </View>
                <View className="padding-xs">
                  <Button look="anna" onTap={() => href(page_path.succeess)}>结算</Button>
                </View>
              </View>
            </View>
          </View>
        )}
    </View>
  );
};
