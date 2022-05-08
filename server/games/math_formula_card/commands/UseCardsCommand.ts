import { Command } from '@colyseus/command';
import MathFormulaCardState from '../state/MathFormulaCardState';
import { Client } from 'colyseus';
import { IPlayerCard } from '../state/PlayerCardState';
import { evaluate } from 'mathjs';
import { MathFormulaCardMessage } from '../../../../features/math_formula_card/models/MathFormulaCardMessage';

type Payload = {
  client: Client;
  cards: IPlayerCard[];
};

export default class UseCardsCommand extends Command<MathFormulaCardState> {
  execute(data: Payload) {
    const { client, cards } = data;
    let isIllegalFormula = false;
    let isPreviousSymbol = false;
    cards.forEach((card, index) => {
      if (
        (index === 0 && card.cardSymbol) ||
        (index === cards.length - 1 && card.cardSymbol) ||
        (isPreviousSymbol && card.cardSymbol)
      ) {
        isIllegalFormula = true;
      }
      if (card.cardSymbol) {
        isPreviousSymbol = true;
      } else {
        isPreviousSymbol = false;
      }
    });

    if (isIllegalFormula) {
      client.send(MathFormulaCardMessage.UseCardsFailed, {
        message: '算式不合法',
      });
      return;
    }

    // 解開算式
    const combinedFormula = cards
      .map((card) => card.cardNumber || card.cardSymbol)
      .join('');
    const answer: number = evaluate(combinedFormula);

    // 判斷是否為正解 FIXME: 之後要判斷他是選哪個題目
    if (answer === this.room.state.answers[0]) {
      this.room.broadcast(MathFormulaCardMessage.AnswerCorrectly);
    } else {
      client.send(MathFormulaCardMessage.AnsweredWrong);
    }
  }
}
