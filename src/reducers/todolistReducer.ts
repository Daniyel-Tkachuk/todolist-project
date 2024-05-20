export type StateType = {
   id: string,
   title: string,
   filter: FilterValuesType
};
export type FilterValuesType = "all" | "active" | "completed";

export const todolistReducer = (state: StateType[], action: ActionsType): StateType[] => {
   switch (action.type) {
      case "xxx": {
         return state;
      }
      default: {
         return state;
      }
   }
}


type ActionsType = any;