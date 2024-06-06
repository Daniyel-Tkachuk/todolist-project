import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "../reducers/tasksReducer";
import {addTodolistAC, removeTodolistAC, todolistsReducer, TodolistType} from "../reducers/todolistsReducer";

let todolistId1:string;
let todolistId2:string;

let startTodolistsState: TodolistType[];
let startTasksState: TasksStateType;

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();

   startTodolistsState = [
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to buy', filter: 'completed'},
   ];

   startTasksState = {
      [todolistId1]:[
         {id: "1", title: "CSS", isDone: false},
         {id: "2", title: "JS", isDone: true},
         {id: "3", title: "React", isDone: false},
      ],
      [todolistId2]:[
         {id: "1", title: "bread", isDone: false},
         {id: "2", title: "milk", isDone: true},
         {id: "3", title: "tea", isDone: false},
      ]
   }
});

test("ids should be equals", () => {
   const newTitle = "test todolist";
   const newTodoId = "testId";

   const endTodolistsState = todolistsReducer(startTodolistsState, addTodolistAC(newTodoId, newTitle));
   const endTasksState = tasksReducer(startTasksState, addTodolistAC(newTodoId));

   const idFromTasks = Object.keys(endTasksState).at(-1);

   expect(endTodolistsState.length).toBe(3);
   expect(endTasksState[newTodoId]).toEqual([]);
   expect(endTodolistsState[0].id).toBe(newTodoId);
   expect(endTodolistsState[0].id).toBe(idFromTasks);

});

test("correct todolist should be deleted and property tasks too", () => {
   const endTodolistsState = todolistsReducer(startTodolistsState, removeTodolistAC(todolistId2));
   const endTasksState = tasksReducer(startTasksState, removeTodolistAC(todolistId2));

   const keys = Object.keys(endTasksState);

   expect(endTodolistsState.length).toBe(1);
   expect(keys.length).toBe(1);
   expect(endTasksState[todolistId2]).not.toBeDefined();
});