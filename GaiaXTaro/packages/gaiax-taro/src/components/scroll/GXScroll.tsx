import { View } from '@tarojs/components';
import React, { CSSProperties, ReactNode } from 'react';
import { GXJSONArray } from '../../gaiax/GXJson';
import VirtualList from '@tarojs/components/virtual-list'
import { GXNode } from '../../gaiax/GXNode';
import GXTemplateContext from '../../gaiax/GXTemplateContext';
import GXUtils from '../../gaiax/GXUtils';
import { GXEngineInstance, GXTemplateInfo } from '../..';

export interface GXScrollState {

}

export interface GXScrollProps {
    propStyle?: string | CSSProperties
    propDataValue?: GXJSONArray
    propGXTemplateContext: GXTemplateContext
    propGXNode: GXNode
}

const Row = React.memo(() => {
    return (
        <View style="width:100px;height:100px;background-color:black;" />
    );
})


export default class GXScroll extends React.Component<GXScrollProps, GXScrollState> {
    render() {
        const {
            propStyle,
            propGXTemplateContext,
            propGXNode,
            propDataValue
        } = this.props

        const gxTemplateNode = propGXNode.gxTemplateNode;

        const gxScrollConfig = gxTemplateNode.finalGXScrollConfig;

        const gxStyle = gxTemplateNode.finalStyle;

        let virtualListWidth = GXUtils.convertWidthToNumber(gxStyle.width + '');
        let virtualListHeight = GXUtils.convertHeightToNumber(gxStyle.height + '');

        // 容器的子坑位，目前只支持一个
        const gxChildTemplateItem = propGXNode.gxChildTemplateItems[0];

        // 获取数据
        let gxTemplateInfo: GXTemplateInfo = GXEngineInstance.gxData.getTemplateInfo(gxChildTemplateItem);

        if (gxScrollConfig.direction == 'horizontal') {

            let childItemWidth = gxTemplateInfo.css[`#${gxTemplateInfo.layer['id']}`]['width'];
            let virtualListItemWidth = GXUtils.convertWidthToNumber(childItemWidth);

            return <VirtualList
                height={virtualListHeight}
                width={virtualListWidth}
                layout='horizontal'
                itemData={propDataValue}
                itemCount={propDataValue.length}
                itemSize={virtualListItemWidth}
            >
                {Row}
            </VirtualList>;
        } else {
            let childItemHeight = gxTemplateInfo.css[`#${gxTemplateInfo.layer['id']}`]['height'];
            let virtualListItemHeight = GXUtils.convertHeightToNumber(childItemHeight);

            return <VirtualList
                height={virtualListHeight}
                width={virtualListWidth}
                layout='vertical'
                itemData={propDataValue}
                itemCount={propDataValue.length}
                itemSize={virtualListItemHeight}
            >
                {Row}
            </VirtualList>;
        }
    }
}
