import { addressUtils } from '@0xproject/utils';
import * as chroma from 'chroma-js';
import * as _ from 'lodash';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import * as DocumentTitle from 'react-document-title';
import * as HighLight from 'react-highlight';
import ReactTooltip = require('react-tooltip');
import { Footer } from 'ts/components/footer';
import { TopBar } from 'ts/components/top_bar/top_bar';
import { HelpTooltip } from 'ts/components/ui/help_tooltip';
import { LifeCycleRaisedButton } from 'ts/components/ui/lifecycle_raised_button';
import { StretchableLambo } from 'ts/components/ui/stretchable_lambo';
import { colors } from 'ts/utils/colors';
import { utils } from 'ts/utils/utils';

interface GasCostByLine {
    [line: string]: number;
}

export interface ProfilerProps {
    location: Location;
}

interface ProfilerState {
    contractAddress: string;
    percentToColor: { [percent: string]: string };
    selectedMethod: string;
    gasStatsIfExist: any;
    addressErrMsg: string;
}

export class Profiler extends React.Component<ProfilerProps, ProfilerState> {
    constructor() {
        super();
        const percentToColor = this._getPercentToColor();
        this.state = {
            contractAddress: '0x12459c951127e0c374ff9105dda097662a027093',
            selectedMethod: '*',
            percentToColor,
            gasStatsIfExist: undefined,
            addressErrMsg: '',
        };
    }
    public componentDidMount() {
        window.scrollTo(0, 0);
    }
    public render() {
        return (
            <div>
                <DocumentTitle title="0x Profiler" />
                <TopBar blockchainIsLoaded={false} location={this.props.location} />
                <div
                    id="profiler"
                    className="mx-auto max-width-4 pb4 pt3 mb4"
                    style={{ color: colors.grey800, minHeight: 800 }}
                >
                    <h1 className="center">Solidity Gas Profiler</h1>
                    <div className="p2 center" style={{ fontFamily: 'monospace', fontSize: 14 }}>
                        <div className="pb1">"Premature optimization is the root of all evil."</div>
                        <div>- Donald Knuth</div>
                    </div>
                    <div />
                    {this._renderContractAddressInput()}
                    {this._renderStats()}
                    {this._renderResults()}
                </div>
                <Footer />
            </div>
        );
    }
    private _renderStats() {
        if (_.isUndefined(this.state.gasStatsIfExist)) {
            return null;
        }
        return (
            <div className="p2 center clearfix mx-auto" style={{ backgroundColor: colors.grey50, width: 600 }}>
                <div className="col col-6 left-align">
                    <div className="pb2">Name: {this.state.gasStatsIfExist.name}</div>
                    <div>Solc version: {this.state.gasStatsIfExist.solcVersion}</div>
                </div>
                <div className="col col-6 left-align">
                    <div className="pb2">Optimized: {`${this.state.gasStatsIfExist.optimized}`}</div>
                    <div>Optimized rounds: {this.state.gasStatsIfExist.optimizedRounds}</div>
                </div>
            </div>
        );
    }
    private _renderMethodDropDown() {
        if (!addressUtils.isAddress(this.state.contractAddress) || _.isUndefined(this.state.gasStatsIfExist)) {
            return null;
        }
        const methods = _.keys(this.state.gasStatsIfExist.gasCostByLineBySignature);
        const menuItems = _.map(methods, (method: string) => {
            return (
                <MenuItem
                    key={`menuItem-${method}`}
                    value={method}
                    primaryText={method === '*' ? 'All methods' : method}
                />
            );
        });
        return (
            <div className="flex">
                <div>
                    <DropDownMenu value={this.state.selectedMethod} onChange={this._onChangeMethod.bind(this)}>
                        {menuItems}
                    </DropDownMenu>
                </div>
                <div style={{ paddingTop: 20 }}>
                    <HelpTooltip explanation="Show the gas cost for a specific method" />
                </div>
            </div>
        );
    }
    private _renderContractAddressInput() {
        return (
            <div className="mx-auto flex pb2" style={{ width: 476 }}>
                <div>
                    <TextField
                        value={this.state.contractAddress}
                        floatingLabelText="Contract Address"
                        onChange={this._contractAddressUpdated.bind(this)}
                        errorText={this.state.addressErrMsg}
                        style={{ width: 372 }}
                    />
                </div>
                <div className="pl2" style={{ paddingTop: 27 }}>
                    <LifeCycleRaisedButton
                        isPrimary={true}
                        isDisabled={!_.isEmpty(this.state.addressErrMsg)}
                        labelReady="Profile"
                        labelLoading="Profiling..."
                        labelComplete="Profiled!"
                        onClickAsyncFn={this._onProfileClickedAsync.bind(this)}
                    />
                </div>
            </div>
        );
    }
    private _renderResults() {
        if (_.isUndefined(this.state.gasStatsIfExist)) {
            return null;
        }
        return (
            <div className="pt2 clearfix">
                <div className="col col-2">{this._renderBars()}</div>
                <div className="col col-10">
                    {this._renderMethodDropDown()}
                    <div>
                        <HighLight className={'solidity'}>{this.state.gasStatsIfExist.sourcecode}</HighLight>
                    </div>
                </div>
            </div>
        );
    }
    private _renderBars() {
        const linesOfSource = this.state.gasStatsIfExist.sourcecode.split('\n').length;
        const bars: React.ReactNode[] = [];
        let i = 1;
        const logarithmicGasCostByLine = this._getLogGasCostByLine();
        const maxLogGasCost = this._getMaxGasCost(logarithmicGasCostByLine);
        _.times(linesOfSource, () => {
            let width = 0;
            let barColor = 'green';
            let gasCost = 0;
            if (!_.isUndefined(logarithmicGasCostByLine[i])) {
                gasCost = this.state.gasStatsIfExist.gasCostByLineBySignature[this.state.selectedMethod][i];
                const logGasCost = logarithmicGasCostByLine[i];
                const logGasCostPercent = logGasCost / maxLogGasCost;
                width = logGasCostPercent * 170;
                const widthPercent = logGasCostPercent * 100;
                barColor = this._getBarColor(widthPercent);
            }
            const tooltipId = `${i}-tooltip`;
            const bar = (
                <div key={`${i}-bar`} className="clearfix" style={{ width: '100%', textAling: 'right' }}>
                    <StretchableLambo key={`${i}-bar`} width={width} />
                    <ReactTooltip id={tooltipId}>{gasCost}</ReactTooltip>
                </div>
            );
            bars.push(bar);
            i++;
        });
        return <div style={{ paddingTop: 84 }}>{bars}</div>;
    }
    private _getBarColor(percent: number): string {
        const color = 'green';
        const percents = _.keys(this.state.percentToColor);
        const percentColors = _.values(this.state.percentToColor);
        for (let i = 0; i < _.size(this.state.percentToColor); i++) {
            const percentCutoff = percents[i];
            if (percent <= _.parseInt(percentCutoff)) {
                return percentColors[i];
            }
        }
        return color;
    }
    private _contractAddressUpdated(event: any, newValue: string) {
        let addressErrMsg = '';
        if (!addressUtils.isAddress(newValue)) {
            addressErrMsg = 'Not a valid Ethereum address';
        }

        this.setState({
            contractAddress: newValue,
            addressErrMsg,
        });
    }
    private _getLogGasCostByLine() {
        const logGasCostByLine: { [line: string]: number } = {};
        _.each(
            this.state.gasStatsIfExist.gasCostByLineBySignature[this.state.selectedMethod],
            (gasCostString: string, line: number) => {
                logGasCostByLine[line] = Math.log(_.parseInt(gasCostString));
            },
        );
        return logGasCostByLine;
    }
    private _getMaxGasCost(gasCostByLine: GasCostByLine) {
        let max = 0;
        _.each(gasCostByLine, (gasCost: number, line: string) => {
            if (max < gasCost) {
                max = gasCost;
            }
        });
        return max;
    }
    private async _onProfileClickedAsync() {
        let gasStatsIfExist;
        try {
            gasStatsIfExist = await this._fetchGasStatsAsync();
        } catch (err) {
            let errMsg = '';
            switch (err.message) {
                case 'NOT_A_CONTRACT':
                    errMsg = 'This is not a contract address';
                    break;

                case 'NO_ABI_FOUND':
                    errMsg = 'This contract is not verified on Etherscan';
                    break;

                default:
                    errMsg = 'Something went wrong. Please try again.';
                    break;
            }
            this.setState({
                addressErrMsg: errMsg,
            });
            return false;
        }
        if (!_.isUndefined(gasStatsIfExist)) {
            this.setState({
                gasStatsIfExist,
            });
            return true;
        } else {
            return false;
        }
    }
    private _getPercentToColor() {
        const chromaColors = chroma
            .scale('RdYlBu')
            .domain([0, 1])
            .padding(0.15)
            .colors(101);
        const percentToColor: { [percent: string]: string } = {};
        let i = 0;
        _.times(chromaColors.length, () => {
            percentToColor[i] = chromaColors[i];
            i++;
        });
        return percentToColor;
    }
    private _onChangeMethod(event: any, index: number, value: string) {
        this.setState({
            selectedMethod: value,
        });
    }
    private async _fetchGasStatsAsync() {
        const endpoint = `http://165.227.56.57/profiler/${this.state.contractAddress}`;
        const response = await fetch(endpoint);
        if (response.status !== 200) {
            utils.consoleLog(`failed to fetch ${response}`);
            throw new Error('UNKNOWN_ERROR');
        }
        const responseJSON = await response.json();
        if (!_.isUndefined(responseJSON.error)) {
            throw new Error(responseJSON.error);
        }
        return responseJSON;
    }
}
