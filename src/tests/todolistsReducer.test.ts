import {v1} from "uuid";
import {
   addTodolistAC, changeFilterAC,
   removeTodolistAC,
   todolistsReducer,
   TodolistType,
   updateTodolistTitleAC
} from "../reducers/todolistsReducer";

const todolistId1 = v1();
const todolistId2 = v1();

let state: TodolistType[] = [];

beforeEach(() => {
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

   const endState = todolistsReducer(state, addTodolistAC(newTitle));

   expect(endState.length).toBe(3);
   expect(endState[endState.length - 1].title).toBe("What to read");
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

