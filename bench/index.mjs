import benchmark from "benchmark";
import { produce, setAutoFreeze } from "immer";
import * as Immutable from "immutable";
import update from "immutability-helper";
import * as immot from "../dist/immot.module.js";

setAutoFreeze(false);

const data1 = {
  name: "jack",
};

const dataImmutable1 = Immutable.Map(data1);

console.log("Update object:");
new benchmark.Suite()
  .add("Immer", () => {
    produce(data1, (draft) => {
      draft.name = "tom";
    });
  })
  .add("ImmutableJS", () => {
    Immutable.set(dataImmutable1, "name", "tom");
  })
  .add("ImmutableJS + toJS", () => {
    const self = Immutable.Map(data1);
    const result = Immutable.set(self, "name", "tom");
    result.toObject();
  })
  .add("immutability-helper", () => {
    update(data1, { name: { $set: "tom" } });
  })
  .add("Immet", () => {
    immot.$set(data1, "name", "tom");
  })
  .on("cycle", (e) => console.log("  " + e.target))
  .run();

const data2 = {
  info: {
    user: {
      tom: "good",
    },
  },
};

const dataImmutable2 = Immutable.fromJS(data2);

console.log("Update 3 levels of data:");
new benchmark.Suite()
  .add("Immer", () => {
    produce(data2, (draft) => {
      draft.info.user.tom = "bad";
    });
  })
  .add("ImmutableJS", () => {
    Immutable.setIn(dataImmutable2, ["info", "user", "tom"], "bad");
  })
  .add("ImmutableJS + toJS", () => {
    const self = Immutable.fromJS(data2);
    const result = Immutable.setIn(self, ["info", "user", "tom"], "bad");
    result.toJS();
  })
  .add("immutability-helper", () => {
    update(data2, { info: { user: { tom: { $set: "bad" } } } });
  })
  .add("Immet", () => {
    immot.$setIn(data2, ["info", "user", "tom"], "bad");
  })
  .on("cycle", (e) => console.log("  " + e.target))
  .run();

const data3 = {
  info: Array.from(Array(50000).keys()),
};

const dataImmutable3 = Immutable.fromJS(data3);

console.log("Update the long array:");
new benchmark.Suite()
  .add("Immer", () => {
    produce(data3, (draft) => {
      draft.info[2000] = 0;
    });
  })
  .add("ImmutableJS", () => {
    Immutable.setIn(dataImmutable3, ["info", 2000], 0);
  })
  .add("ImmutableJS + toJS", () => {
    const self = Immutable.fromJS(data3);
    const result = Immutable.setIn(self, ["info", 2000], 0);
    result.toJS();
  })
  .add("immutability-helper", () => {
    update(data3, { info: { [2000]: { $set: 0 } } });
  })
  .add("Immet", () => {
    immot.$setIn(data3, ["info", 2000], 0);
  })
  .on("cycle", (e) => console.log("  " + e.target))
  .run();
