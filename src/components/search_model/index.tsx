import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

import './index.less'

export interface Props {
    text: string;
    color?: string;
    searchFun: () => void;
}

const SearchModel = ({ text, color, searchFun }: React.PropsWithChildren<Props>) => {

    return (
        <View className="search" style={{ background: color }}>
            <View className="hideSortContent flex align-center" onClick={searchFun}>
                <View><Icon type="search_light" size="36" color="#aaaaaa" /></View>
                <View className="text-gray padding-left-sm flex-sub">{text}</View>
            </View>
        </View>
    );
};

export default SearchModel;