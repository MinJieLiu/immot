import { immet } from "../src/immet";

test("Test $set", () => {
  interface DemoType {
    info: {
      sales: {
        users: {
          tom: string;
          tony?: string;
        };
        money: number;
      };
      products: string[];
    };
  }

  const demoData: DemoType = {
    info: {
      sales: {
        users: {
          tom: "good",
        },
        money: 2000,
      },
      products: ["phone", "book", "milk"],
    },
  };

  const demo1 = immet.$set(demoData.info, "products", ["apple"]);
  expect(demo1).toEqual({
    sales: {
      users: {
        tom: "good",
      },
      money: 2000,
    },
    products: ["apple"],
  });
  expect(demoData.info.products).toEqual(["phone", "book", "milk"]);
  expect(demo1.sales).toBe(demoData.info.sales);
  expect(demo1.products).not.toBe(demoData.info.products);

  const demo2 = immet.$set(demoData.info.products, 1, "apple");
  expect(demo2).toEqual(["phone", "apple", "milk"]);
  expect(demo2).not.toBe(demoData.info.products);

  const demo3 = immet.$set(demoData.info.sales.users, "tony", "ok");
  expect(demo3).toEqual({
    tom: "good",
    tony: "ok",
  });
  expect(demo3).not.toBe(demoData.info.sales.users);

  const demo4 = immet.$set(demo3, "tony", "ok");
  expect(demo4).toBe(demo3);
});

test("Test $setIn", () => {
  const demoData = {
    info: {
      sales: {
        users: {
          tom: "good",
        },
        money: undefined as undefined | number[],
      },
      products: ["phone", "book", "milk"],
    },
  };

  const demo1 = immet.$setIn(
    demoData,
    ["info", "sales", "users", "tom"],
    "bad"
  );
  expect(demo1).toEqual({
    info: {
      sales: {
        users: {
          tom: "bad",
        },
        money: undefined,
      },
      products: ["phone", "book", "milk"],
    },
  });
  expect(demo1).not.toBe(demoData);
  expect(demo1.info).not.toBe(demoData.info);
  expect(demo1.info.sales).not.toBe(demoData.info.sales);
  expect(demo1.info.sales.users).not.toBe(demoData.info.sales.users);
  expect(demo1.info.products).toBe(demoData.info.products);
  expect(demo1.info.sales.money).toBe(demoData.info.sales.money);

  const demo2 = immet.$setIn(demoData, ["info", "sales", "money", 1], 500);

  expect(demo2).toEqual({
    info: {
      sales: {
        users: {
          tom: "good",
        },
        money: [undefined, 500],
      },
      products: ["phone", "book", "milk"],
    },
  });

  expect(demo2.info).not.toBe(demoData.info);
  expect(demo2.info.sales).not.toBe(demoData.info.sales);
  expect(demo2.info.sales.users).toBe(demoData.info.sales.users);
  expect(demoData.info.sales.money).toBeUndefined();

  const demo3 = immet.$setIn(demo2, ["info", "sales", "money", 1], 500);

  expect(demo3).toBe(demo2);
});

test("Test $merge", () => {
  const demoData = {
    tom: "good",
    jack: undefined as string | undefined,
  };

  const demo1 = immet.$merge(demoData, { tom: "bad", jack: "good" });
  expect(demo1).toEqual({
    tom: "bad",
    jack: "good",
  });
  expect(demo1).not.toBe(demoData);
});

test("Test $mergeIn", () => {
  const demoData = {
    info: {
      users: {
        tom: "good",
      },
      money: [100, 200, 300],
    },
  };

  const demo1 = immet.$mergeIn(demoData, ["info", "users"], {
    tom: "bad",
  });
  expect(demo1).toEqual({
    info: {
      users: {
        tom: "bad",
      },
      money: [100, 200, 300],
    },
  });
  expect(demo1).not.toBe(demoData);
  expect(demo1.info).not.toBe(demoData.info);
  expect(demo1.info.users).not.toBe(demoData.info.users);
  expect(demo1.info.money).toBe(demoData.info.money);

  const demo2 = immet.$mergeIn(demoData, ["info", "money"], [400]);

  expect(demo2).toEqual({
    info: {
      users: {
        tom: "good",
      },
      money: [400, 200, 300],
    },
  });
  expect(demo2.info.money).not.toBe(demoData.info.money);
});

test("Test $update", () => {
  const demoData = {
    money: 1,
  };

  const demo1 = immet.$update(demoData, "money", (prev) => prev + 1);
  expect(demo1).toEqual({
    money: 2,
  });
  expect(demo1).not.toBe(demoData);
});

test("Test $updateIn", () => {
  const demoData = {
    money: [
      {
        user: "tom",
      },
    ],
  };

  const demo1 = immet.$updateIn(
    demoData,
    ["money", 0, "user"],
    (prev) => `${prev} & jerry`
  );
  expect(demo1).toEqual({
    money: [
      {
        user: "tom & jerry",
      },
    ],
  });
  expect(demo1).not.toBe(demoData);

  const demo2 = immet.$updateIn(demoData, ["money", 1, "user"], () => "jerry");
  expect(demo2).toEqual({
    money: [
      {
        user: "tom",
      },
      {
        user: "jerry",
      },
    ],
  });
  expect(demo2).not.toBe(demoData);
  expect(demo2.money[0]).toBe(demoData.money[0]);
});

test("Test $delete", () => {
  const demoData = {
    money: [1, 2, 3],
    old: 12 as number | undefined,
  };

  const demo1 = immet.$delete(demoData.money, 1);
  expect(demo1).toEqual([1, 3]);
  expect(demo1).not.toBe(demoData.money);

  const demo2 = immet.$delete(demoData, "old");
  expect(demo2).toEqual({
    money: [1, 2, 3],
  });
  expect(demo2).not.toBe(demoData);
  expect(demo2.money).toBe(demoData.money);
});

test("Test $push", () => {
  const demoData = [1, 2, 3];

  const demo1 = immet.$push(demoData, 4);
  expect(demo1).toEqual([1, 2, 3, 4]);
  expect(demo1).not.toBe(demoData);

  const demo2 = immet.$push(demoData, 4, 5);
  expect(demo2).toEqual([1, 2, 3, 4, 5]);
  expect(demo1).not.toBe(demoData);
  expect(demo2).not.toBe(demo1);
});

test("Test $pop", () => {
  const demoData = [1, 2, 3];

  const demo1 = immet.$pop(demoData);
  expect(demo1).toEqual([1, 2]);
  expect(demo1).not.toBe(demoData);
});

test("Test $shift", () => {
  const demoData = [1, 2, 3];

  const demo1 = immet.$shift(demoData);
  expect(demo1).toEqual([2, 3]);
  expect(demo1).not.toBe(demoData);
});

test("Test $unshift", () => {
  const demoData = [1, 2, 3];

  const demo1 = immet.$unshift(demoData, 0);
  expect(demo1).toEqual([0, 1, 2, 3]);
  expect(demo1).not.toBe(demoData);
});

test("Test $splice", () => {
  const demoData = [1, 2, 3];

  const demo1 = immet.$splice(demoData, 1, 0, 1.5);
  expect(demo1).toEqual([1, 1.5, 2, 3]);
  expect(demo1).not.toBe(demoData);
});

test("Test todo list", () => {
  interface TodoItem {
    title: string;
    complete?: boolean;
  }
  const state = {
    todoList: [
      {
        title: "A",
      },
    ] as TodoItem[],
  };
  // add
  const demo1 = immet.$update(state, "todoList", (list) =>
    immet.$push(list, { title: "B" })
  );
  expect(demo1).toEqual({
    todoList: [
      {
        title: "A",
      },
      {
        title: "B",
      },
    ],
  });
  expect(demo1.todoList[0]).toBe(state.todoList[0]);

  // update title
  const demo2 = immet.$setIn(demo1, ["todoList", 0, "title"], "C");

  expect(demo2).toEqual({
    todoList: [
      {
        title: "C",
      },
      {
        title: "B",
      },
    ],
  });

  const demo3 = immet.$updateIn(
    demo2,
    ["todoList", 0, "complete"],
    (complete) => !complete
  );

  expect(demo3).toEqual({
    todoList: [
      {
        title: "C",
        complete: true,
      },
      {
        title: "B",
      },
    ],
  });

  // delete
  const demo4 = immet.$updateIn(demo3, ["todoList", 0], (todoItem) =>
    immet.$delete(todoItem, "complete")
  );

  expect(demo4).toEqual({
    todoList: [
      {
        title: "C",
      },
      {
        title: "B",
      },
    ],
  });
});
