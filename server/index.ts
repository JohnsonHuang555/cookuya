// import express from 'express';
// import next from 'next';
// import http from 'http';
// import { Server } from 'colyseus';
// import { monitor } from '@colyseus/monitor';
import { GameList } from '../models/Game';
import TicTacToe from './games/tictactoe/TicTacToe';
import ChineseChess from './games/chinese_chess/ChineseChess';

// const port = parseInt(process.env.PORT || '3000', 10);
// const dev = process.env.NODE_ENV !== 'production';
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();

// nextApp.prepare().then(() => {
//   const app = express();
//   const server = http.createServer(app);
//   const gameServer = new Server({ server });

//   app.use('/colyseus', monitor());

//   app.all('*', (req: any, res: any) => {
//     return handle(req, res);
//   });

//   // games
//   gameServer.define(GameList.TicTacToe, TicTacToe).enableRealtimeListing();
//   gameServer
//     .define(GameList.ChineseChess, ChineseChess)
//     .enableRealtimeListing();
//   gameServer.listen(port);
// });
import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

const port = Number(process.env.PORT || 2568);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({ server });
app.use('/colyseus', monitor());

// games
gameServer.define(GameList.TicTacToe, TicTacToe).enableRealtimeListing();
gameServer.define(GameList.ChineseChess, ChineseChess).enableRealtimeListing();
gameServer.listen(port);

console.log(`Listening on ws://localhost:${port}`);
