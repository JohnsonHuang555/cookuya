import {
  CardSymbol,
  IPlayerCard,
} from 'server/games/math_formula_card/state/PlayerCardState';
import { CardSymbols } from '../models/CardSymbols';
import { OtherPlayerDict, OthersPlayerInfo } from '../models/OtherPlayerCard';

// 其他玩家手牌只記剩餘數量就可以
export enum ActionType {
  DrawCard = 'DrawCard',
  UseCard = 'UseCard',
  SelectCard = 'SelectCard',
  UpdateYourPoint = 'UpdateYourPoint',
  DrawOthersCard = 'DrawOthersCard',
  UseOthersCard = 'UseOthersCard',
  InitOthersPlayerInfo = 'InitOthersPlayerInfo',
  UpdateOthersPlayerInfo = 'UpdateOthersPlayerInfo',
  ClearErrorMsg = 'ClearErrorMsg',
  CreateAnswers = 'CreateAnswers',
}

type SelectedCard = {
  id: string;
  value: number | CardSymbol;
};

export type State = {
  answers: number[]; // 先挖洞，之後答案可能有好幾種
  // 你的手牌
  yourCards: IPlayerCard[];
  yourPoint: number;
  selectedCards: SelectedCard[];
  // 其他玩家手牌
  otherPlayerDict: OtherPlayerDict;
  // 錯誤訊息
  errorMsg: string;
};

export const initialState: State = {
  answers: [],
  yourCards: [],
  yourPoint: 0,
  selectedCards: [],
  otherPlayerDict: {},
  errorMsg: '',
};

type DrawCardAction = {
  type: ActionType.DrawCard;
  playerCard: IPlayerCard;
};

type UseCardAction = {
  type: ActionType.UseCard;
  cardId: string;
};

type DrawOthersCardAction = {
  type: ActionType.DrawOthersCard;
  playerId: string;
};

type UseOthersCardAction = {
  type: ActionType.UseOthersCard;
  playerId: string;
};

type InitOthersInfoAction = {
  type: ActionType.InitOthersPlayerInfo;
  playerId: string;
  name: string;
};

type UpdateOthersInfoAction = {
  type: ActionType.UpdateOthersPlayerInfo;
  playerId: string;
  playerInfo: Partial<OthersPlayerInfo>;
};

type SelectCardAction = {
  type: ActionType.SelectCard;
  id: string;
  value: number | CardSymbol;
};

type ClearErrorMsgAction = {
  type: ActionType.ClearErrorMsg;
};

type UpdateYourPointAction = {
  type: ActionType.UpdateYourPoint;
  point: number;
};

type CreateAnswersAction = {
  type: ActionType.CreateAnswers;
  answer: number;
};

type Action =
  | DrawCardAction
  | UseCardAction
  | DrawOthersCardAction
  | UseOthersCardAction
  | InitOthersInfoAction
  | UpdateOthersInfoAction
  | SelectCardAction
  | ClearErrorMsgAction
  | UpdateYourPointAction
  | CreateAnswersAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.DrawCard: {
      // 新增一張牌
      return {
        ...state,
        yourCards: [...state.yourCards, action.playerCard],
      };
    }
    case ActionType.UseCard: {
      // 使用一張牌
      return {
        ...state,
      };
    }
    case ActionType.DrawOthersCard: {
      // 其他玩家抽牌
      const newState = { ...state.otherPlayerDict };
      newState[action.playerId].remainCardCount++;
      return {
        ...state,
        otherPlayerDict: newState,
      };
    }
    case ActionType.UseOthersCard: {
      // 其他玩家出牌
      const newState = { ...state.otherPlayerDict };
      newState[action.playerId].remainCardCount--;
      return {
        ...state,
        otherPlayerDict: newState,
      };
    }
    case ActionType.InitOthersPlayerInfo: {
      // 初始化玩家資訊
      const newState = { ...state.otherPlayerDict };
      newState[action.playerId] = {
        remainCardCount: 0,
        name: action.name,
        point: 0,
        isNowTurn: false,
      };
      return {
        ...state,
        otherPlayerDict: newState,
      };
    }
    case ActionType.UpdateOthersPlayerInfo: {
      // 更新其他玩家的資訊
      const newState = { ...state.otherPlayerDict };
      newState[action.playerId] = {
        ...newState[action.playerId],
        ...action.playerInfo,
      };

      return {
        ...state,
        otherPlayerDict: newState,
      };
    }
    case ActionType.SelectCard: {
      let newCards = [...state.selectedCards];
      // 第一張不能選符號
      if (
        newCards.length === 0 &&
        CardSymbols.includes(action.value as CardSymbol)
      ) {
        return {
          ...state,
          errorMsg: '第一張不能選符號',
        };
      }

      const hasExist = newCards.findIndex((card) => card.id === action.id);
      if (hasExist !== -1) {
        newCards.splice(hasExist, 1);
      } else {
        newCards = [...newCards, { id: action.id, value: action.value }];
      }

      // 只剩選取符號
      const onlySymbolsLeft = newCards.find(
        (card) => typeof card.value === 'number'
      );
      if (newCards.length !== 0 && !onlySymbolsLeft) {
        return {
          ...state,
          errorMsg: '至少要有數字',
        };
      }

      // 第一張不能是符號
      if (
        newCards.length !== 0 &&
        CardSymbols.includes(newCards[0].value as CardSymbol)
      ) {
        return {
          ...state,
          errorMsg: '符號不能排第一張',
        };
      }

      if (
        newCards.length > 2 &&
        CardSymbols.includes(action.value as CardSymbol) &&
        CardSymbols.includes(newCards[newCards.length - 2].value as CardSymbol)
      ) {
        return {
          ...state,
          errorMsg: '不能連續兩個符號',
        };
      }

      return {
        ...state,
        selectedCards: newCards,
      };
    }
    case ActionType.ClearErrorMsg: {
      return {
        ...state,
        errorMsg: '',
      };
    }
    case ActionType.UpdateYourPoint: {
      return {
        ...state,
        yourPoint: action.point,
      };
    }
    case ActionType.CreateAnswers: {
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
