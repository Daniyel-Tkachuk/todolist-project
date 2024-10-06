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

export const setErrorAC = (error: string | null) => {
   return {
      type: "APP/SET-ERROR",
      error
   } as const;
}

// -------------- types ---------------

// types initState
type InitialStateType = typeof initialState;

// types AC
type AppActionsType = SetStatusAT | SetErrorAT;

// actions
type SetStatusAT = ReturnType<typeof setStatusAC>;
type SetErrorAT = ReturnType<typeof setErrorAC>;