# Benchmarks

These are the results while running this directory's benchmark suite in Node v14.17.0.

```
Update object:
Immer               x    446,283 ops/sec ±1.76% (91 runs sampled)
ImmutableJS         x 20,863,234 ops/sec ±1.87% (84 runs sampled)
ImmutableJS + toJS  x  4,026,485 ops/sec ±2.17% (82 runs sampled)
immutability-helper x  1,316,655 ops/sec ±3.13% (87 runs sampled)
Immet               x 18,909,870 ops/sec ±2.14% (89 runs sampled)

Update 3 levels of data:
Immer               x   124,190 ops/sec ±1.76% (89 runs sampled)
ImmutableJS         x 1,618,960 ops/sec ±0.91% (92 runs sampled)
ImmutableJS + toJS  x   448,523 ops/sec ±1.23% (87 runs sampled)
immutability-helper x   500,749 ops/sec ±1.92% (91 runs sampled)
Immet               x 3,214,762 ops/sec ±1.46% (90 runs sampled)

Update the long array:
Immer               x       742 ops/sec ±0.94% (91 runs sampled)
ImmutableJS         x 1,511,248 ops/sec ±0.78% (93 runs sampled)
ImmutableJS + toJS  x        49 ops/sec ±1.11% (64 runs sampled)
immutability-helper x       102 ops/sec ±1.18% (75 runs sampled)
Immet               x     5,466 ops/sec ±1.60% (89 runs sampled)
```
