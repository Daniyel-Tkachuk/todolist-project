import {
   addTaskAC,
   changeTaskStatusAC,
   removeTaskAC,
   StateType,
   tasksReducer,
   updateTaskTitleAC
} from "../reducers/tasksReducer";
import {v1} from "uuid";
import {addTodolistAC} from "../reducers/todolistsReducer";

let todolistId1: string;
let todolistId2: string;

let startState: StateType;

beforeEach(()  => {
   todolistId1 = v1();
   todolistId2 = v1();

   startState = {
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

test("correct task should be deleted from correct array", () => {
   const endState = tasksReducer(startState, removeTaskAC(todolistId2, "2"));

   expect(endState[todolistId2].length).toBe(2);
   expect(endState[todolistId1].length).toBe(3);
   expect(endState[todolistId2]).toEqual([
      {id: "1", title: "bread", isDone: false},
      {id: "3", title: "tea", isDone: false},
   ]);
});

test("correct task should be added to correct array", () => {
   const newTitle = "NextJS";
   const endState = tasksReducer(startState, addTaskAC(todolistId1, newTitle));

   expect(endState[todolistId1][0]).toBeDefined();
   expect(endState[todolistId1].length).toBe(4);
   expect(endState[todolistId1][0].title).toBe(newTitle);
   expect(endState[todolistId1][0].isDone).toBe(false);
   expect(endState[todolistId2].length).toBe(3);
});

test("status of specified task should be  changed", () => {
   const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, "2", false));

   expect(endState[todolistId2][0].isDone).toBeFalsy()
   expect(endState[todolistId2][1].isDone).toBeFalsy()
   expect(endState[todolistId2][2].isDone).toBeFalsy()
   expect(endState[todolistId1]).toEqual([
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false},
   ])
});

test("title of specified task should be update", () => {
   const newTitle = "eggs";
   const endState = tasksReducer(startState, updateTaskTitleAC(todolistId2, "2", newTitle));

   expect(endState).not.toEqual(startState);
   expect(endState[todolistId2]).not.toEqual(startState[todolistId2]);
   expect(endState[todolistId2].length).toBe(3);
   expect(endState[todolistId2][1].title).toBe(newTitle);
   expect(endState[todolistId2][0].title).toBe("bread");
   expect(endState[todolistId2][2].title).toBe("tea");
});

test("new array should be added when new todolist is added", () => {
   const titleForNewTodolist = "todolistTest";

   const endState = tasksReducer(startState, addTodolistAC(titleForNewTodolist));

   const keys = Object.keys(endState);
   const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
   if (!newKey) {
      throw Error("new key should be added");
   }

   expect(keys.length).toBe(3);
   expect(endState[newKey]).toEqual([]);
});