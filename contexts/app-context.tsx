import { ActionType, ActionTypeEnum, ContextDataType } from "@/contexts/types";

function appReducer(data: ContextDataType, action: ActionType) {
  switch (action.type) {
    case ActionTypeEnum.ADD:
      return [];
  }
}
