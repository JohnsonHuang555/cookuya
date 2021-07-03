import { GameInstance } from '@ion-phaser/react';
import Bootstrap from './scenes/Bootstrap';
import Hidden from './scenes/mode/Hidden';

// 遊戲設定
export const ChineseChessConfig: GameInstance = {
  width: innerWidth,
  height: innerHeight,
  type: Phaser.AUTO,
  scene: [Bootstrap, Hidden],
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // physics: {
  //   arcade: {
  //     debug: true,
  //   },
  // },
};
