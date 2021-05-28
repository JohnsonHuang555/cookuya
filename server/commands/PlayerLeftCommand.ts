import { Command } from '@colyseus/command';
import { TicTacToe } from '../tictactoe/TicTacToeState';

type Payload = {
  playerId: string;
};

export default class PlayerLeftCommand extends Command<TicTacToe> {
  execute(data: Payload) {
    const idx = this.room.state.players.findIndex(
      (player) => player.id === data.playerId
    );
    const isMaster = this.room.state.players[idx].isMaster;
    this.room.state.players.splice(idx, 1);

    // 離開的是房主要重新指派
    if (isMaster) {
      this.room.state.players[0].isMaster = true;
    }

    // 重新指派所有玩家 playerIndex
    for (let i = 0; i < this.room.state.players.length; i++) {
      this.room.state.players[i].playerIndex = i;
    }
  }
}
