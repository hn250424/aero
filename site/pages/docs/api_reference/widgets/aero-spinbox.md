# `src/components/spinbox/AeroSpinbox.ts`:

## class: `AeroSpinbox`, `aero-spinbox`

### Superclass

| Name                   | Module                         | Package |
| ---------------------- | ------------------------------ | ------- |
| `BaseAeroNumericInput` | /src/base/BaseAeroNumericInput |         |

### Fields

| Name                                    | Privacy   | Type                                                   | Default                                                                                                                                                                                         | Description | Inherited From       |
| --------------------------------------- | --------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `minus`                                 | private   | `HTMLElement`                                          |                                                                                                                                                                                                 |             |                      |
| `plus`                                  | private   | `HTMLElement`                                          |                                                                                                                                                                                                 |             |                      |
| `aeroSpinboxAttributeHandlers`          | private   | `Record< string, (val: string \| null) => void >`      | `{ "text-minus": (val) => { this.updateMinuxText(val); }, "text-plus": (val) => { this.updatePlusText(val); }, "button-backgroundcolor": (val) => { this.updateButtonBackgrondColor(val); }, }` |             |                      |
| `buttonBackgroundColor`                 |           |                                                        |                                                                                                                                                                                                 |             |                      |
| `minusText`                             |           |                                                        |                                                                                                                                                                                                 |             |                      |
| `plusText`                              |           |                                                        |                                                                                                                                                                                                 |             |                      |
| `_input`                                | private   | `HTMLInputElement`                                     |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `_min`                                  | private   | `string`                                               |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `_max`                                  | private   | `string`                                               |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `_step`                                 | private   | `string`                                               |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `_decimalPlaces`                        | private   | `string`                                               |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `baseAeroNumericInputAttributeHandlers` | private   | `Record< string, (newValue: string \| null) => void >` | `{ min: (newValue) => { this.updateMinValue(newValue); }, max: (newValue) => { this.updateMaxValue(newValue); }, step: (newValue) => { this.updateStepValue(newValue); }, }`                    |             | BaseAeroNumericInput |
| `input`                                 |           |                                                        |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `value`                                 |           |                                                        | `value`                                                                                                                                                                                         |             | BaseAeroNumericInput |
| `min`                                   |           |                                                        |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `max`                                   |           |                                                        |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `step`                                  |           |                                                        |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `decimalPlaces`                         | protected |                                                        |                                                                                                                                                                                                 |             | BaseAeroNumericInput |
| `shadow`                                | protected | `ShadowRoot`                                           |                                                                                                                                                                                                 |             | AeroShadowElement    |
| `innerHTML`                             |           |                                                        | `htmlTemplate`                                                                                                                                                                                  |             | AeroShadowElement    |

### Methods

| Name                         | Privacy   | Description | Parameters            | Return   | Inherited From       |
| ---------------------------- | --------- | ----------- | --------------------- | -------- | -------------------- |
| `getInputSelector`           | protected |             |                       | `string` | BaseAeroNumericInput |
| `updateMinuxText`            | private   |             | `val: string \| null` |          |                      |
| `updatePlusText`             | private   |             | `val: string \| null` |          |                      |
| `updateButtonBackgrondColor` | private   |             | `val: string \| null` |          |                      |
| `updateHeight`               | private   |             | `val: number \| null` |          |                      |
| `decrement`                  |           |             |                       |          |                      |
| `increment`                  |           |             |                       |          |                      |
| `initializeInput`            | private   |             |                       |          | BaseAeroNumericInput |
| `getValidateValue`           | protected |             | `value: string`       | `string` | BaseAeroNumericInput |
| `updateMinValue`             | private   |             | `val: string \| null` |          | BaseAeroNumericInput |
| `updateMaxValue`             | private   |             | `val: string \| null` |          | BaseAeroNumericInput |
| `updateStepValue`            | private   |             | `val: string \| null` |          | BaseAeroNumericInput |
| `query`                      | protected |             | `selector: string`    | `T`      | AeroShadowElement    |
| `applyStyles`                | protected |             | `style: string`       |          | AeroShadowElement    |

### Attributes

| Name                     | Field | Inherited From       |
| ------------------------ | ----- | -------------------- |
| `text-minus`             |       |                      |
| `text-plus`              |       |                      |
| `button-backgroundcolor` |       |                      |
| `min`                    |       | BaseAeroNumericInput |
| `max`                    |       | BaseAeroNumericInput |
| `step`                   |       | BaseAeroNumericInput |

<hr/>

## Exports

| Kind                        | Name           | Declaration | Module                                | Package |
| --------------------------- | -------------- | ----------- | ------------------------------------- | ------- |
| `js`                        | `default`      | AeroSpinbox | src/components/spinbox/AeroSpinbox.ts |         |
| `custom-element-definition` | `aero-spinbox` | AeroSpinbox | src/components/spinbox/AeroSpinbox.ts |         |
