import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'remax/wechat';
import { Cell, Loading, Card, Icon, Row, Col } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import GroupRow from '@/components/group_row';
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [orderItems] = useState([
    {
      path: page_path.order_list,
      title: '待付款',
      icon: 'pic'
    },
    {
      path: page_path.order_list,
      title: '待配送',
      icon: 'pic'
    },
    {
      path: page_path.order_list,
      title: '待提货',
      icon: 'pic'
    },
    {
      path: page_path.order_list,
      title: '已提货',
      icon: 'pic'
    },
    {
      path: page_path.order_list,
      title: '退款/售后',
      icon: 'pic'
    },
  ])

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View>
      <View className="padding-tb-xl" style={{ background: "#f77 url('/image/img_bg_my.png') no-repeat", backgroundSize: '100%' }}>
        <View className="flex align-center padding-lr">
          <View>
            <Image src="http://dummyimage.com/200x200" style={{ width: '140rpx', height: '140rpx', borderRadius: '100%' }} />
          </View>
          <View className="flex-sub margin-lr text-white">
            <View>haha</View>
            <View className=" text-sm">喝茶养鱼斗蛐蛐</View>
          </View>
          <View style={{ padding: '10rpx', color: '#fff', borderRadius: '100%' }}>编辑</View>
        </View>
      </View>

      <View className="padding-lr-sm" style={{ marginTop: '-30rpx' }}>
        <GroupRow items={orderItems} isRadius={true} type='icon' title="我的单子" isRight={true} rightText="查看全部订单" rightViod={() => toast("列表")} />
      </View>

      <View className="padding-lr-sm margin-top-sm radius">
        <Cell label="积分" arrow></Cell>
        <Cell label="向店长出示二维码提货" arrow onTap={() => href(page_path.qrcode)}></Cell>
        <Cell label="常见帮助" arrow></Cell>
      </View>
      {isLoading && (
        <PageLoading />
      )}
    </View>
  );
};
