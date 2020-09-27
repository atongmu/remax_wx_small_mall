import * as React from 'react';
import { Grid } from 'anna-remax-ui';
import { View, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    columns?: number;
    items: Array<any>;
    detail: () => void;
}

const CategoryModel = ({ columns = 3, items, detail }: React.PropsWithChildren<Props>) => {
    const renderGridItem = (items: any, index?: number) => (
        <View className="text-center margin-bottom-sm" onClick={detail}>
            <Image className="category-image" src={items.image} mode="widthFix" />
            <View className="category-title">{items.title}</View>
        </View>
    );
    return (
        <View className="category-model">
            <Grid data={items} columns={columns}>
                {renderGridItem}
            </Grid>
        </View>
    );
};

export default CategoryModel;