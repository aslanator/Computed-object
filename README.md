# Computed-object

The library makes it possible to create an object with computed
properties that are recalculated only when the variables used in them have been changed.

## Example:
```javascript
const baseObject = {expenses: [100, 300, 800, 200]};
const computedFunctions = {
    expensesSum() {
        return this.expenses.reduce((sum, cost) => cost + sum);
    }
};
const computedObject = new Computed(baseObject, computedFunctions);
let sum = computedObject.expensesSum; // 1400, recalculated
...
let sum = computedObject.expensesSum; // 1400, not recalculated
computedObject.expenses = [100, 200, 300];
sum = computedObject.expensesSum; // 600, recalculated
```
