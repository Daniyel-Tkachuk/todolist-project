export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type InitialStateType = typeof initialState;

const initialState = {
   status: "loading" as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
   switch (action.type) {
      case "APP/SET-STATUS": {
         return {...state, status: action.status}
      }
      default: {
         return state;
      }
   }
}

export const setStatusAC = (status: RequestStatusType) => {
   return {
      type: "APP/SET-STATUS",
      status
   } as const;
}

type AppActionsType = SetStatusAT;

type SetStatusAT = ReturnType<typeof setStatusAC>;