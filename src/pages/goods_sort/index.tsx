import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, getStorageSync, setStorageSync } from 'remax/wechat';
import { Icon, Stepper } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import SearchModel from '@/components/search_model/index';
import { getSorts } from '@/api/index'
import page_path from '@/utils/page_path';
import { deepClone } from '@/utils/util';


export interface OptionProps {
  key: string;
  value: string;
  image: string;
  children?: OptionProps[];
}
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
  num: number,
  delivery: number,
  city: string,
}
export interface GoodsSku {
  key: string,
  value: string,
  image: string
}
let currentParent: any = null;
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [ReturnDeliveryWay, setReturnDeliveryWay] = useState<any[]>([])
  const [activeParent, setActiveParent] = useState(1);
  const [childrenData, setChildrenData] = useState<OptionProps[]>([]);
  const [ategorys] = useState([
    {
      id:1,
      image: '/image/mall/category/1.jpg',
      title: '短袖T恤'
    },
    {
      id:2,
      image: '/image/mall/category/2.jpg',
      title: '足球'
    },
    {
      id:3,
      image: '/image/mall/category/3.jpg',
      title: '运动鞋'
    },
    {
      id:4,
      image: '/image/mall/category/4.png',
      title: '中老年'
    },
    {
      id:5,
      image: '/image/mall/category/5.png',
      title: '甜美风'
    },
    {
      id:6,
      image: '/image/mall/category/6.jpg',
      title: '鱼尾裙'
    },
    {
      id:7,
      image: '/image/mall/category/7.jpg',
      title: '相机配件'
    },
    {
      id:8,
      image: '/image/mall/category/8.jpg',
      title: '护肤套装'
    },
  ])
  const [items, setItems] = useState<any[]>([
    {
      id: 1,
      image: '/image/mall/product/1.jpg',
      name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
      sale: 599,
      factory: 899,
      payNum: 2342,
      num: 0
    },
    {
      id: 2,
      image: '/image/mall/product/2.jpg',
      name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
      sale: 29,
      factory: 69,
      payNum: 999,
      num: 0
    },
    {
      id: 3,
      image: '/image/mall/product/3.jpg',
      name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
      sale: 299,
      factory: 699,
      payNum: 666,
      num: 0
    },
    {
      id: 4,
      image: '/image/mall/product/4.jpg',
      name: '百雀羚套装女补水保湿护肤品',
      sale: 1599,
      factory: 2899,
      payNum: 236,
      num: 0
    },
    {
      id: 5,
      image: '/image/mall/product/5.jpg',
      name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
      sale: 599,
      factory: 899,
      payNum: 2399,
      num: 0
    },
    {
      id: 6,
      image: '/image/mall/product/6.jpg',
      name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
      sale: 599,
      factory: 899,
      payNum: 2399,
      num: 0
    },
    {
      id: 7,
      image: '/image/mall/product/1.jpg',
      name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
      sale: 599,
      factory: 899,
      payNum: 2342,
      num: 0
    },
    {
      id: 8,
      image: '/image/mall/product/2.jpg',
      name: '德国DMK进口牛奶',
      sale: 29,
      factory: 69,
      payNum: 999,
      num: 0
    },
    {
      id: 9,
      image: '/image/mall/product/3.jpg',
      name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
      sale: 299,
      factory: 699,
      payNum: 666,
      num: 0
    },
    {
      id: 10,
      image: '/image/mall/product/4.jpg',
      name: '百雀羚套装女补水保湿护肤品',
      sale: 1599,
      factory: 2899,
      payNum: 236,
      num: 0
    }
  ])
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    // const sortResult: any = await getSorts()
    // if (sortResult.status === 200) {
    //   setReturnDeliveryWay(sortResult.data)
    //   const data = sortResult.data[0].children || [];
    //   currentParent = sortResult.data[0];
    //   setActiveParent(currentParent.key);
    //   setChildrenData(data);
    // }
    wx.setTabBarBadge({
      index: 2,
      text: '1'
    })
    setLoading(false)
  }

  const handleClickParentOption = (option: any) => {
    const data = option.children || [];
    currentParent = option;
    setChildrenData(data);
    setActiveParent(option.id);
  };
  return (
    <View className="app">
      <View className="nav fixed">
        <SearchModel text='搜索' color="#f77" searchFun={() => href(page_path.search)} />
      </View>
      <View className="goods-sort">
        <View className="sort-left">
          <ScrollView scrollY={true} style={{ height: '100%' }}>
            {ategorys.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`sort-item ${activeParent === item.id && 'active'}`}
                  onClick={() => handleClickParentOption(item)}
                >
                  {item.title}
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View className="sort-right">
          <ScrollView scrollY={true} style={{ height: '100%' }} enableBackToTop>
            {items.map((item, index) => {
              return (
                <View key={index} className="solid-bottom" >
                  <View className="flex align-center padding-tb-xs">
                    <View style={{ width: '160', height: '160' }}
                      onClick={() => href(page_path.goods_detail)}
                    >
                      <Image className="image" src={item.image} mode="widthFix" />
                    </View>
                    <View className="flex-sub margin-lr-xs">
                      <View className="title text-clamp">{item.name}</View>
                      <View className="margin-tb-sm flex align-center justify-end">
                        <View className="flex-sub">
                          <Text className="text-red text-price text-lg">100</Text>
                        </View>
                        {item.num === 0 ? (
                          <View className="round padding-xs" style={{ lineHeight: 1, background: '#fdd' }} onClick={() => {
                            const new_items = deepClone(items)
                            setItems(
                              new_items.map((i: any) => {
                                return { ...i, num: item.id === i.id ? item.num + 1 : i.num };
                              }),
                            );
                          }}>
                            <Icon type="cart" size="36" color="#c77" />
                          </View>
                        ) : (
                            <Stepper value={item.num} onChange={(val: any) => {
                              const new_items = deepClone(items)
                              setItems(
                                new_items.map((i: any) => {
                                  return { ...i, num: item.id === i.id ? val : i.num };
                                }),
                              );
                            }} />
                          )}
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      {isLoading && (
        <PageLoading />
      )}
    </View>
  );
};
