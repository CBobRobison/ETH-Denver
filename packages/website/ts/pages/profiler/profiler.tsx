import { addressUtils } from '@0xproject/utils';
import * as chroma from 'chroma-js';
import * as _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
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
    lambo: boolean;
}

export class Profiler extends React.Component<ProfilerProps, ProfilerState> {
    constructor() {
        super();
        const percentToColor = this._getPercentToColor();
        this.state = {
            contractAddress: '0x12459c951127e0c374ff9105dda097662a027093',
            selectedMethod: '*',
            percentToColor,
            gasStatsIfExist: {
                gasCostByLineBySignature: {
                    '*': {
                        '10': 4091,
                        '11': 4909,
                        '12': 1593,
                        '15': 11142,
                        '151': 19648,
                        '16': 2862,
                        '17': 19550,
                        '18': 3760,
                        '21': 652,
                        '214': 150,
                        '215': 62262,
                        '216': 11304,
                        '219': 7897,
                        '22': 14399,
                        '220': 4455,
                        '221': 80805,
                        '222': 2727619,
                        '223': 32430,
                        '226': 919,
                        '228': 390,
                        '229': 3183678,
                        '230': 177137,
                        '231': 24349,
                        '234': 1008,
                        '235': 416,
                        '236': 6096,
                        '237': 89024,
                        '238': 3463092,
                        '239': 36032,
                        '252': 6895,
                        '254': 7810108,
                        '255': 819,
                        '256': 7759227,
                        '257': 451,
                        '258': 15580,
                        '259': 11,
                        '260': 1315,
                        '261': 538025,
                        '262': 87325,
                        '265': 1055,
                        '266': 10400,
                        '267': 10560,
                        '268': 360,
                        '269': 8920,
                        '270': 120,
                        '272': 40,
                        '274': 206936,
                        '275': 293278,
                        '276': 217190,
                        '277': 196085,
                        '278': 341940,
                        '306': 973,
                        '307': 1282268,
                        '308': 1273371,
                        '309': 111106,
                        '310': 24808,
                        '4': 608,
                        '5': 1672,
                        '6': 12008,
                        undefined: 98270,
                    },
                    'cancelOrder(address,uint256,address,uint256,uint256,uint256,uint8,bytes32,bytes32)': {
                        '151': 994,
                        '306': 973,
                        '307': 1282268,
                        '308': 1273371,
                        '309': 111106,
                        '310': 24808,
                        undefined: 4046,
                    },
                    'deposit()': {
                        '15': 150,
                        '151': 3096,
                        '16': 54,
                        '17': 366,
                        '18': 48,
                        '21': 6,
                        '214': 150,
                        '215': 62262,
                        '216': 11304,
                        '219': 66,
                        '22': 132,
                        undefined: 1692,
                    },
                    'depositToken(address,uint256)': {
                        '15': 325,
                        '151': 2788,
                        '16': 117,
                        '17': 793,
                        '18': 104,
                        '21': 13,
                        '219': 143,
                        '22': 286,
                        '226': 919,
                        '228': 390,
                        '229': 3183678,
                        '230': 177137,
                        '231': 24349,
                        undefined: 6180,
                    },
                    'trade(address,uint256,address,uint256,uint256,uint256,address,uint8,bytes32,bytes32,uint256)': {
                        '10': 3378,
                        '11': 4072,
                        '12': 1314,
                        '15': 10667,
                        '151': 3110,
                        '16': 2691,
                        '17': 18391,
                        '18': 3608,
                        '21': 602,
                        '219': 6567,
                        '22': 13299,
                        '252': 6895,
                        '254': 7810108,
                        '255': 819,
                        '256': 7759227,
                        '257': 451,
                        '258': 15580,
                        '259': 11,
                        '260': 1315,
                        '261': 538025,
                        '262': 87325,
                        '265': 1055,
                        '266': 10400,
                        '267': 10560,
                        '268': 360,
                        '269': 8920,
                        '270': 120,
                        '272': 40,
                        '274': 206936,
                        '275': 293278,
                        '276': 217190,
                        '277': 196085,
                        '278': 341940,
                        '4': 608,
                        '5': 1672,
                        '6': 12008,
                        undefined: 70756,
                    },
                    'withdraw(uint256)': {
                        '10': 345,
                        '11': 405,
                        '12': 135,
                        '151': 2460,
                        '21': 15,
                        '219': 945,
                        '22': 330,
                        '220': 4455,
                        '221': 80805,
                        '222': 2727619,
                        '223': 32430,
                        undefined: 7500,
                    },
                    'withdrawToken(address,uint256)': {
                        '10': 368,
                        '11': 432,
                        '12': 144,
                        '151': 7200,
                        '21': 16,
                        '219': 176,
                        '22': 352,
                        '234': 1008,
                        '235': 416,
                        '236': 6096,
                        '237': 89024,
                        '238': 3463092,
                        '239': 36032,
                        undefined: 8096,
                    },
                },
                name: 'EtherDelta',
                optimized: true,
                optimizedRounds: 200,
                solcVersion: 'v0.4.9+commit.364da425',
                sourcecode:
                    'pragma solidity ^0.4.9;\r\n\r\ncontract SafeMath {\r\n  function safeMul(uint a, uint b) internal returns (uint) {\r\n    uint c = a * b;\r\n    assert(a == 0 || c / a == b);\r\n    return c;\r\n  }\r\n\r\n  function safeSub(uint a, uint b) internal returns (uint) {\r\n    assert(b <= a);\r\n    return a - b;\r\n  }\r\n\r\n  function safeAdd(uint a, uint b) internal returns (uint) {\r\n    uint c = a + b;\r\n    assert(c>=a && c>=b);\r\n    return c;\r\n  }\r\n\r\n  function assert(bool assertion) internal {\r\n    if (!assertion) throw;\r\n  }\r\n}\r\n\r\ncontract Token {\r\n  /// @return total amount of tokens\r\n  function totalSupply() constant returns (uint256 supply) {}\r\n\r\n  /// @param _owner The address from which the balance will be retrieved\r\n  /// @return The balance\r\n  function balanceOf(address _owner) constant returns (uint256 balance) {}\r\n\r\n  /// @notice send `_value` token to `_to` from `msg.sender`\r\n  /// @param _to The address of the recipient\r\n  /// @param _value The amount of token to be transferred\r\n  /// @return Whether the transfer was successful or not\r\n  function transfer(address _to, uint256 _value) returns (bool success) {}\r\n\r\n  /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`\r\n  /// @param _from The address of the sender\r\n  /// @param _to The address of the recipient\r\n  /// @param _value The amount of token to be transferred\r\n  /// @return Whether the transfer was successful or not\r\n  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}\r\n\r\n  /// @notice `msg.sender` approves `_addr` to spend `_value` tokens\r\n  /// @param _spender The address of the account able to transfer the tokens\r\n  /// @param _value The amount of wei to be approved for transfer\r\n  /// @return Whether the approval was successful or not\r\n  function approve(address _spender, uint256 _value) returns (bool success) {}\r\n\r\n  /// @param _owner The address of the account owning tokens\r\n  /// @param _spender The address of the account able to transfer the tokens\r\n  /// @return Amount of remaining tokens allowed to spent\r\n  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}\r\n\r\n  event Transfer(address indexed _from, address indexed _to, uint256 _value);\r\n  event Approval(address indexed _owner, address indexed _spender, uint256 _value);\r\n\r\n  uint public decimals;\r\n  string public name;\r\n}\r\n\r\ncontract StandardToken is Token {\r\n\r\n  function transfer(address _to, uint256 _value) returns (bool success) {\r\n    //Default assumes totalSupply can\'t be over max (2^256 - 1).\r\n    //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn\'t wrap.\r\n    //Replace the if with this one instead.\r\n    if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {\r\n    //if (balances[msg.sender] >= _value && _value > 0) {\r\n      balances[msg.sender] -= _value;\r\n      balances[_to] += _value;\r\n      Transfer(msg.sender, _to, _value);\r\n      return true;\r\n    } else { return false; }\r\n  }\r\n\r\n  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {\r\n    //same as above. Replace this line with the following if you want to protect against wrapping uints.\r\n    if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {\r\n    //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {\r\n      balances[_to] += _value;\r\n      balances[_from] -= _value;\r\n      allowed[_from][msg.sender] -= _value;\r\n      Transfer(_from, _to, _value);\r\n      return true;\r\n    } else { return false; }\r\n  }\r\n\r\n  function balanceOf(address _owner) constant returns (uint256 balance) {\r\n    return balances[_owner];\r\n  }\r\n\r\n  function approve(address _spender, uint256 _value) returns (bool success) {\r\n    allowed[msg.sender][_spender] = _value;\r\n    Approval(msg.sender, _spender, _value);\r\n    return true;\r\n  }\r\n\r\n  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {\r\n    return allowed[_owner][_spender];\r\n  }\r\n\r\n  mapping(address => uint256) balances;\r\n\r\n  mapping (address => mapping (address => uint256)) allowed;\r\n\r\n  uint256 public totalSupply;\r\n}\r\n\r\ncontract ReserveToken is StandardToken, SafeMath {\r\n  address public minter;\r\n  function ReserveToken() {\r\n    minter = msg.sender;\r\n  }\r\n  function create(address account, uint amount) {\r\n    if (msg.sender != minter) throw;\r\n    balances[account] = safeAdd(balances[account], amount);\r\n    totalSupply = safeAdd(totalSupply, amount);\r\n  }\r\n  function destroy(address account, uint amount) {\r\n    if (msg.sender != minter) throw;\r\n    if (balances[account] < amount) throw;\r\n    balances[account] = safeSub(balances[account], amount);\r\n    totalSupply = safeSub(totalSupply, amount);\r\n  }\r\n}\r\n\r\ncontract AccountLevels {\r\n  //given a user, returns an account level\r\n  //0 = regular user (pays take fee and make fee)\r\n  //1 = market maker silver (pays take fee, no make fee, gets rebate)\r\n  //2 = market maker gold (pays take fee, no make fee, gets entire counterparty\'s take fee as rebate)\r\n  function accountLevel(address user) constant returns(uint) {}\r\n}\r\n\r\ncontract AccountLevelsTest is AccountLevels {\r\n  mapping (address => uint) public accountLevels;\r\n\r\n  function setAccountLevel(address user, uint level) {\r\n    accountLevels[user] = level;\r\n  }\r\n\r\n  function accountLevel(address user) constant returns(uint) {\r\n    return accountLevels[user];\r\n  }\r\n}\r\n\r\ncontract EtherDelta is SafeMath {\r\n  address public admin; //the admin address\r\n  address public feeAccount; //the account that will receive fees\r\n  address public accountLevelsAddr; //the address of the AccountLevels contract\r\n  uint public feeMake; //percentage times (1 ether)\r\n  uint public feeTake; //percentage times (1 ether)\r\n  uint public feeRebate; //percentage times (1 ether)\r\n  mapping (address => mapping (address => uint)) public tokens; //mapping of token addresses to mapping of account balances (token=0 means Ether)\r\n  mapping (address => mapping (bytes32 => bool)) public orders; //mapping of user accounts to mapping of order hashes to booleans (true = submitted by user, equivalent to offchain signature)\r\n  mapping (address => mapping (bytes32 => uint)) public orderFills; //mapping of user accounts to mapping of order hashes to uints (amount of order that has been filled)\r\n\r\n  event Order(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, address user);\r\n  event Cancel(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, address user, uint8 v, bytes32 r, bytes32 s);\r\n  event Trade(address tokenGet, uint amountGet, address tokenGive, uint amountGive, address get, address give);\r\n  event Deposit(address token, address user, uint amount, uint balance);\r\n  event Withdraw(address token, address user, uint amount, uint balance);\r\n\r\n  function EtherDelta(address admin_, address feeAccount_, address accountLevelsAddr_, uint feeMake_, uint feeTake_, uint feeRebate_) {\r\n    admin = admin_;\r\n    feeAccount = feeAccount_;\r\n    accountLevelsAddr = accountLevelsAddr_;\r\n    feeMake = feeMake_;\r\n    feeTake = feeTake_;\r\n    feeRebate = feeRebate_;\r\n  }\r\n\r\n  function() {\r\n    throw;\r\n  }\r\n\r\n  function changeAdmin(address admin_) {\r\n    if (msg.sender != admin) throw;\r\n    admin = admin_;\r\n  }\r\n\r\n  function changeAccountLevelsAddr(address accountLevelsAddr_) {\r\n    if (msg.sender != admin) throw;\r\n    accountLevelsAddr = accountLevelsAddr_;\r\n  }\r\n\r\n  function changeFeeAccount(address feeAccount_) {\r\n    if (msg.sender != admin) throw;\r\n    feeAccount = feeAccount_;\r\n  }\r\n\r\n  function changeFeeMake(uint feeMake_) {\r\n    if (msg.sender != admin) throw;\r\n    if (feeMake_ > feeMake) throw;\r\n    feeMake = feeMake_;\r\n  }\r\n\r\n  function changeFeeTake(uint feeTake_) {\r\n    if (msg.sender != admin) throw;\r\n    if (feeTake_ > feeTake || feeTake_ < feeRebate) throw;\r\n    feeTake = feeTake_;\r\n  }\r\n\r\n  function changeFeeRebate(uint feeRebate_) {\r\n    if (msg.sender != admin) throw;\r\n    if (feeRebate_ < feeRebate || feeRebate_ > feeTake) throw;\r\n    feeRebate = feeRebate_;\r\n  }\r\n\r\n  function deposit() payable {\r\n    tokens[0][msg.sender] = safeAdd(tokens[0][msg.sender], msg.value);\r\n    Deposit(0, msg.sender, msg.value, tokens[0][msg.sender]);\r\n  }\r\n\r\n  function withdraw(uint amount) {\r\n    if (tokens[0][msg.sender] < amount) throw;\r\n    tokens[0][msg.sender] = safeSub(tokens[0][msg.sender], amount);\r\n    if (!msg.sender.call.value(amount)()) throw;\r\n    Withdraw(0, msg.sender, amount, tokens[0][msg.sender]);\r\n  }\r\n\r\n  function depositToken(address token, uint amount) {\r\n    //remember to call Token(address).approve(this, amount) or this contract will not be able to do the transfer on your behalf.\r\n    if (token==0) throw;\r\n    if (!Token(token).transferFrom(msg.sender, this, amount)) throw;\r\n    tokens[token][msg.sender] = safeAdd(tokens[token][msg.sender], amount);\r\n    Deposit(token, msg.sender, amount, tokens[token][msg.sender]);\r\n  }\r\n\r\n  function withdrawToken(address token, uint amount) {\r\n    if (token==0) throw;\r\n    if (tokens[token][msg.sender] < amount) throw;\r\n    tokens[token][msg.sender] = safeSub(tokens[token][msg.sender], amount);\r\n    if (!Token(token).transfer(msg.sender, amount)) throw;\r\n    Withdraw(token, msg.sender, amount, tokens[token][msg.sender]);\r\n  }\r\n\r\n  function balanceOf(address token, address user) constant returns (uint) {\r\n    return tokens[token][user];\r\n  }\r\n\r\n  function order(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce) {\r\n    bytes32 hash = sha256(this, tokenGet, amountGet, tokenGive, amountGive, expires, nonce);\r\n    orders[msg.sender][hash] = true;\r\n    Order(tokenGet, amountGet, tokenGive, amountGive, expires, nonce, msg.sender);\r\n  }\r\n\r\n  function trade(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, address user, uint8 v, bytes32 r, bytes32 s, uint amount) {\r\n    //amount is in amountGet terms\r\n    bytes32 hash = sha256(this, tokenGet, amountGet, tokenGive, amountGive, expires, nonce);\r\n    if (!(\r\n      (orders[user][hash] || ecrecover(sha3("\\x19Ethereum Signed Message:\\n32", hash),v,r,s) == user) &&\r\n      block.number <= expires &&\r\n      safeAdd(orderFills[user][hash], amount) <= amountGet\r\n    )) throw;\r\n    tradeBalances(tokenGet, amountGet, tokenGive, amountGive, user, amount);\r\n    orderFills[user][hash] = safeAdd(orderFills[user][hash], amount);\r\n    Trade(tokenGet, amount, tokenGive, amountGive * amount / amountGet, user, msg.sender);\r\n  }\r\n\r\n  function tradeBalances(address tokenGet, uint amountGet, address tokenGive, uint amountGive, address user, uint amount) private {\r\n    uint feeMakeXfer = safeMul(amount, feeMake) / (1 ether);\r\n    uint feeTakeXfer = safeMul(amount, feeTake) / (1 ether);\r\n    uint feeRebateXfer = 0;\r\n    if (accountLevelsAddr != 0x0) {\r\n      uint accountLevel = AccountLevels(accountLevelsAddr).accountLevel(user);\r\n      if (accountLevel==1) feeRebateXfer = safeMul(amount, feeRebate) / (1 ether);\r\n      if (accountLevel==2) feeRebateXfer = feeTakeXfer;\r\n    }\r\n    tokens[tokenGet][msg.sender] = safeSub(tokens[tokenGet][msg.sender], safeAdd(amount, feeTakeXfer));\r\n    tokens[tokenGet][user] = safeAdd(tokens[tokenGet][user], safeSub(safeAdd(amount, feeRebateXfer), feeMakeXfer));\r\n    tokens[tokenGet][feeAccount] = safeAdd(tokens[tokenGet][feeAccount], safeSub(safeAdd(feeMakeXfer, feeTakeXfer), feeRebateXfer));\r\n    tokens[tokenGive][user] = safeSub(tokens[tokenGive][user], safeMul(amountGive, amount) / amountGet);\r\n    tokens[tokenGive][msg.sender] = safeAdd(tokens[tokenGive][msg.sender], safeMul(amountGive, amount) / amountGet);\r\n  }\r\n\r\n  function testTrade(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, address user, uint8 v, bytes32 r, bytes32 s, uint amount, address sender) constant returns(bool) {\r\n    if (!(\r\n      tokens[tokenGet][sender] >= amount &&\r\n      availableVolume(tokenGet, amountGet, tokenGive, amountGive, expires, nonce, user, v, r, s) >= amount\r\n    )) return false;\r\n    return true;\r\n  }\r\n\r\n  function availableVolume(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, address user, uint8 v, bytes32 r, bytes32 s) constant returns(uint) {\r\n    bytes32 hash = sha256(this, tokenGet, amountGet, tokenGive, amountGive, expires, nonce);\r\n    if (!(\r\n      (orders[user][hash] || ecrecover(sha3("\\x19Ethereum Signed Message:\\n32", hash),v,r,s) == user) &&\r\n      block.number <= expires\r\n    )) return 0;\r\n    uint available1 = safeSub(amountGet, orderFills[user][hash]);\r\n    uint available2 = safeMul(tokens[tokenGive][user], amountGet) / amountGive;\r\n    if (available1<available2) return available1;\r\n    return available2;\r\n  }\r\n\r\n  function amountFilled(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, address user, uint8 v, bytes32 r, bytes32 s) constant returns(uint) {\r\n    bytes32 hash = sha256(this, tokenGet, amountGet, tokenGive, amountGive, expires, nonce);\r\n    return orderFills[user][hash];\r\n  }\r\n\r\n  function cancelOrder(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, uint8 v, bytes32 r, bytes32 s) {\r\n    bytes32 hash = sha256(this, tokenGet, amountGet, tokenGive, amountGive, expires, nonce);\r\n    if (!(orders[msg.sender][hash] || ecrecover(sha3("\\x19Ethereum Signed Message:\\n32", hash),v,r,s) == msg.sender)) throw;\r\n    orderFills[msg.sender][hash] = amountGet;\r\n    Cancel(tokenGet, amountGet, tokenGive, amountGive, expires, nonce, msg.sender, v, r, s);\r\n  }\r\n}',
                txCountBySignature: {
                    '*': 100,
                    'cancelOrder(address,uint256,address,uint256,uint256,uint256,uint8,bytes32,bytes32)': 7,
                    'deposit()': 6,
                    'depositToken(address,uint256)': 15,
                    'trade(address,uint256,address,uint256,uint256,uint256,address,uint8,bytes32,bytes32,uint256)': 41,
                    'withdraw(uint256)': 15,
                    'withdrawToken(address,uint256)': 16,
                },
            },
            addressErrMsg: '',
            lambo: false,
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
                <div id="profiler" className="mx-auto max-width-4 pb4 pt3 mb4" style={{ color: colors.grey800 }}>
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
    private _renderLamboToggle() {
        if (!addressUtils.isAddress(this.state.contractAddress) || _.isUndefined(this.state.gasStatsIfExist)) {
            return null;
        }
        return (
            <div className="flex pl4" style={{ paddingTop: 17 }}>
                <div>
                    <Toggle
                        toggled={this.state.lambo}
                        label="Lambo"
                        labelPosition="right"
                        onToggle={this._onToggleLambo.bind(this)}
                    />
                </div>
                <div className="pl1" style={{ paddingTop: 3 }}>
                    <HelpTooltip explanation="Express costs as streched Lambo's." />
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
                    <div className="flex">
                        {this._renderMethodDropDown()}
                        {this._renderLamboToggle()}
                    </div>
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
                <div
                    key={`${i}-bar`}
                    className="clearfix"
                    style={{
                        width: '100%',
                        height: 21,
                        overflow: 'hidden',
                    }}
                >
                    <span data-tip={true} data-for={tooltipId}>
                        {this.state.lambo && width > 0 ? (
                            <StretchableLambo key={`${i}-bar`} width={width} />
                        ) : (
                            <div className="right" style={{ height: 21.5, width, backgroundColor: barColor }} />
                        )}
                    </span>
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
    private _onToggleLambo(event: any, isInputChecked: boolean) {
        this.setState({
            lambo: isInputChecked,
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
