import {v1} from "uuid";
import {
   addTodolistAC, changeFilterAC,
   removeTodolistAC,
   todolistsReducer,
   TodolistType,
   updateTodolistTitleAC
} from "../reducers/todolistsReducer";

let todolistId1: string;
let todolistId2: string;

let state: TodolistType[] = [];

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();

   state = [
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to buy', filter: 'completed'},
   ]
});

test("correct todolist should be removed", () => {
   const endState = todolistsReducer(state, removeTodolistAC(todolistId2));

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId1);
   expect(endState[0].title).toBe("What to learn")
});

test("correct todolist should be added", () => {
   const newTitle = "What to read";
   const newTodoId = v1();

   const endState = todolistsReducer(state, addTodolistAC(newTodoId, newTitle));

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe("What to read");
});

test("correct todolist should be changed title", () => {
   const newTitle = "What to read"

   const endState = todolistsReducer(state, updateTodolistTitleAC(todolistId2, newTitle));

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe("What to read");
});

test("correct todolist should be changed filter", () => {
   const endState = todolistsReducer(state, changeFilterAC(todolistId1, "active"));

   expect(endState.length).toBe(2);
   expect(endState[0].filter).toBe("active");
   expect(endState[1].filter).toBe("completed");
});


