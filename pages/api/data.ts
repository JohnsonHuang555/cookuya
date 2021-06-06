import { Game, GameList } from 'models/Game';

// TODO: 假資料之後寫入資料庫
export const games: Game[] = [
  {
    id: 1,
    name: '圈圈叉叉',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '我的第一個遊戲',
    description:
      '中國大陸、臺灣又稱為井字遊戲、圈圈叉叉；另外也有打井遊戲、○×棋的稱呼，香港多稱井字過三關、過三關，是種紙筆遊戲，另有多種衍生變化玩法。',
    homeImg: '/tictactoe/home.png',
    estimateTime: 5,
    gamePack: GameList.TicTacToe,
  },
  {
    id: 2,
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '西洋棋簡述',
    description:
      '又叫國際象棋，是一種二人對弈的戰術棋盤遊戲，也是世界上最流行的遊戲之一。世界各地數以百萬計的人在家中、俱樂部中、網路上以通信西洋棋或比賽形式對弈。西洋棋的棋盤由64個黑白相間的八乘八網格組成，分為1至8列及A至H行。每位玩家開局時各有16個棋子：一國王（王）、一皇后（后）、兩城堡（車）、兩騎士（馬）、兩主教（象）和八兵，各具不同功能與走法。棋手行棋目標是將對方的國王處在不可避免的威脅之下以將死對方，也可以通過對方自知無望、主動認輸而獲勝，另有相當多的情況可導致和局。遊戲過程分三個階段：開局、中局、殘局，共有1043至1050種棋局變化。現代西洋棋棋子多用木頭或塑膠製成，也有用石材製作；較為精美的石頭、玻璃（水晶）或金屬製棋子常用作裝飾擺設。',
    homeImg: '/tictactoe/home.png',
    estimateTime: 5,
    gamePack: GameList.Chess,
  },
];
