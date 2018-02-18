import * as _ from 'lodash';
import * as React from 'react';
import { constants } from 'ts/utils/constants';

interface StrechableLamboProps {
    width: number;
}

export class StretchableLambo extends React.Component<StrechableLamboProps> {
    public static defaultProps: Partial<StrechableLamboProps> = {
        width: 10,
    };
    public render() {
        const angle = 130 - this.props.width;
        const baseStyle = {
            float: 'right',
            height: 21,
            width: this.props.width,
            borderImageSource: 'url(images/stretch-lambo.png)',
            borderStyle: 'solid',
            borderLeftWidth: 45,
            borderRightWidth: 37,
            borderImageSlice: '0 30% 0 40% fill',
            borderTop: '0',
            borderBottom: '0',
            filter: `hue-rotate(${angle}deg)`,
        };
        const transparent = {
            filter: 'grayscale(100%) opacity(15%) blur(1px)',
        };
        const style = {
            ...baseStyle,
            ...this.props.width === 0 ? transparent : {},
        };
        return <div style={style} />;
    }
}

/*

element {
    height: 25px;
    width: 150px;
    background-color: rgb(255, 248, 181);
    border-image-source: url(images/stretch-lambo.png);
    border-style: solid;
    border-left-width: 45px;
    border-image-slice: 0 30% 0 40% fill;
    filter: hue-rotate(300deg);
    border-right-width: 37px;
}
*/
