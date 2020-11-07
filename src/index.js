import Vue from 'vue';
// import NumberBaseBall from './NumberBaseBall';
// import ResponseCheck from './ResponseCheck';
// import RockScissorsPaper from './RockScissorsPaper';
// import LottoGenerator from './LottoGenerator';
// import TicTacToe from './TicTacToe/TicTacToe';
import MineSweeper from './MineSweeper/MineSweeper';

new Vue({ render: createElement => createElement(MineSweeper) }).$mount('#root');