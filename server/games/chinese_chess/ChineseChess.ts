import { Client, Room } from 'colyseus';
import ChineseChessState from './state/ChineseChessState';
import { Dispatcher } from '@colyseus/command';
import BaseRoom from '../../room';
import { Metadata } from '../../../models/Room';
import GameUseCase from '../../usecases/GameUseCase';
import { Game, GameList } from '../../../models/Game';
import { GameMode } from '../../../features/chinese_chess/models/ChinesChessMode';
import { ChineseChessMessage } from '../../../features/chinese_chess/models/ChineseChessMessage';
import { ChineseChessGroup } from '../../../features/chinese_chess/models/ChineseChessGroup';
import { ChineseChessGroupMap } from '../../../features/chinese_chess/models/ChineseChessGroup';
import FlipChessCommand from './commands/FlipChessCommand';
import CreateGameCommand from './commands/CreateGameCommand';
import ResetCommand from './commands/ResetCommand';
import EatChessCommand from './commands/EatChessCommand';
import MoveChessCommand from './commands/MoveChessCommand';
import UpdatePlayerGroupCommand from '../../room/commands/UpdatePlayerGroupCommand';
import { RoomMessage } from '../../../models/Message';
import CheckWinnerCommand from './commands/CheckWinnerCommand';
import SurrenderCommand from './commands/SurrenderCommand';

export default class ChineseChess extends Room<ChineseChessState, Metadata> {
  private dispatcher = new Dispatcher(this);
  private baseRoom = new BaseRoom(this);
  private game: Game = GameUseCase.getGameByGamePack(GameList.ChineseChess);

  onCreate(option: Metadata) {
    this.baseRoom.onCreate(option);
    if (!option.gameMode) {
      throw new Error('game mode not found');
    }

    const maxPlayers = this.game.modes?.find(
      (m) => m.value === option.gameMode
    )?.maxPlayers;
    this.baseRoom.setMaxClient(maxPlayers as number);
    this.setState(new ChineseChessState());

    this.onMessage(RoomMessage.CreateGame, () => {
      this.dispatcher.dispatch(new CreateGameCommand(), {
        mode: option.gameMode as GameMode,
      });
    });

    this.onMessage(
      ChineseChessMessage.FlipChess,
      (client, message: { id: number }) => {
        const chessIndex = this.state.chineseChesses.findIndex(
          (c) => c.id === message.id
        );
        this.dispatcher.dispatch(new FlipChessCommand(), {
          chessIndex,
        });
        const side = this.state.chineseChesses[chessIndex].chessSide;
        this.dispatcher.dispatch(new UpdatePlayerGroupCommand(), {
          allGroups: [ChineseChessGroup.Black, ChineseChessGroup.Red],
          needSetGroup: ChineseChessGroupMap[side],
          playerId: client.id,
        });
      }
    );

    this.onMessage(
      ChineseChessMessage.EatChess,
      (client, message: { id: number; targetId: number }) => {
        this.dispatcher.dispatch(new EatChessCommand(), {
          id: message.id,
          targetId: message.targetId,
        });
        const clientIndex = this.clients.findIndex((c) => c.id === client.id);
        const group = this.state.players[clientIndex].group;
        this.dispatcher.dispatch(new CheckWinnerCommand(), {
          gameMode: this.metadata.gameMode as GameMode,
          group,
        });
      }
    );

    this.onMessage(
      ChineseChessMessage.MoveChess,
      (_c, message: { id: number; targetX: number; targetY: number }) => {
        this.dispatcher.dispatch(new MoveChessCommand(), {
          id: message.id,
          targetX: message.targetX,
          targetY: message.targetY,
        });
      }
    );

    this.onMessage(ChineseChessMessage.Surrender, (client) => {
      this.dispatcher.dispatch(new SurrenderCommand(), {
        client,
      });
    });

    // 結束遊戲
    this.onMessage(RoomMessage.FinishGame, () => {
      this.dispatcher.dispatch(new ResetCommand());
    });
  }

  onJoin(client: Client, option: Metadata) {
    this.baseRoom.onJoin(client, option);
  }

  onLeave(client: Client) {
    this.baseRoom.onLeave(client);
    this.dispatcher.dispatch(new ResetCommand());
  }
}
