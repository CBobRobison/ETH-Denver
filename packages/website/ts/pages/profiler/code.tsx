import * as React from 'react';
import * as HighLight from 'react-highlight';

export interface CodeProps {
    sourcecode: string;
}

export class Code extends React.PureComponent<CodeProps, {}> {
    public render() {
        return (
            <div>
                <HighLight className={'solidity'} style={{ fontSize: 16, padding: 3 }}>
                    {this.props.sourcecode}
                </HighLight>
            </div>
        );
    }
}
