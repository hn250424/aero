# `src/components/numeric_input/AeroNumericInput.ts`:

## class: `AeroNumericInput`, `aero-numeric-input`

### Superclass

| Name                   | Module                         | Package |
| ---------------------- | ------------------------------ | ------- |
| `BaseAeroNumericInput` | /src/base/BaseAeroNumericInput |         |

### Fields

| Name                                    | Privacy   | Type                                                   | Default                                                                                                                                                                      | Description | Inherited From       |
| --------------------------------------- | --------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `_input`                                | private   | `HTMLInputElement`                                     |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `_min`                                  | private   | `string`                                               |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `_max`                                  | private   | `string`                                               |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `_step`                                 | private   | `string`                                               |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `_decimalPlaces`                        | private   | `string`                                               |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `baseAeroNumericInputAttributeHandlers` | private   | `Record< string, (newValue: string \| null) => void >` | `{ min: (newValue) => { this.updateMinValue(newValue); }, max: (newValue) => { this.updateMaxValue(newValue); }, step: (newValue) => { this.updateStepValue(newValue); }, }` |             | BaseAeroNumericInput |
| `input`                                 |           |                                                        |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `value`                                 |           |                                                        | `value`                                                                                                                                                                      |             | BaseAeroNumericInput |
| `min`                                   |           |                                                        |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `max`                                   |           |                                                        |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `step`                                  |           |                                                        |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `decimalPlaces`                         | protected |                                                        |                                                                                                                                                                              |             | BaseAeroNumericInput |
| `shadow`                                | protected | `ShadowRoot`                                           |                                                                                                                                                                              |             | AeroShadowElement    |
| `innerHTML`                             |           |                                                        | `htmlTemplate`                                                                                                                                                               |             | AeroShadowElement    |

### Methods

| Name               | Privacy   | Description | Parameters            | Return   | Inherited From       |
| ------------------ | --------- | ----------- | --------------------- | -------- | -------------------- |
| `getInputSelector` | protected |             |                       | `string` | BaseAeroNumericInput |
| `initializeInput`  | private   |             |                       |          | BaseAeroNumericInput |
| `getValidateValue` | protected |             | `value: string`       | `string` | BaseAeroNumericInput |
| `updateMinValue`   | private   |             | `val: string \| null` |          | BaseAeroNumericInput |
| `updateMaxValue`   | private   |             | `val: string \| null` |          | BaseAeroNumericInput |
| `updateStepValue`  | private   |             | `val: string \| null` |          | BaseAeroNumericInput |
| `query`            | protected |             | `selector: string`    | `T`      | AeroShadowElement    |
| `applyStyles`      | protected |             | `style: string`       |          | AeroShadowElement    |

### Attributes

| Name   | Field | Inherited From       |
| ------ | ----- | -------------------- |
| `min`  |       | BaseAeroNumericInput |
| `max`  |       | BaseAeroNumericInput |
| `step` |       | BaseAeroNumericInput |

<hr/>

## Exports

| Kind                        | Name                 | Declaration      | Module                                            | Package |
| --------------------------- | -------------------- | ---------------- | ------------------------------------------------- | ------- |
| `js`                        | `default`            | AeroNumericInput | src/components/numeric\_input/AeroNumericInput.ts |         |
| `custom-element-definition` | `aero-numeric-input` | AeroNumericInput | src/components/numeric\_input/AeroNumericInput.ts |         |
