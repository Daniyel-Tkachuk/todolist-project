export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
   status: "loading" as RequestStatusType,
   error: null as string | null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
   switch (action.type) {
      case "APP/SET-STATUS": {
         return {...state, status: action.status}
      }
      case "APP/SET-ERROR": {
         return {...state, error: action.error}
      }
      default: {
         return state;
      }
   }
}

// -------------- AC ---------------

export const setStatusAC = (status: RequestStatusType) => {
   return {
      type: "APP/SET-STATUS",
      status
   } as const;
}

export const setAppErrorAC = (error: string | null) => {
   return {
      type: "APP/SET-ERROR",
      error
   } as const;
}

// -------------- types ---------------

// types initState
type InitialStateType = typeof initialState;

// types AC
type AppActionsType = SetStatusAT | SetAppErrorAT;

// actions
export type SetStatusAT = ReturnType<typeof setStatusAC>;
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;