# `src/components/progress_spinner/AeroProgressSpinner.ts`:

## class: `AeroProgressSpinner`, `aero-progress-spinner`

### Superclass

| Name                | Module                      | Package |
| ------------------- | --------------------------- | ------- |
| `AeroShadowElement` | /src/core/AeroShadowElement |         |

### Fields

| Name         | Privacy   | Type         | Default        | Description | Inherited From    |
| ------------ | --------- | ------------ | -------------- | ----------- | ----------------- |
| `width`      |           |              |                |             |                   |
| `height`     |           |              |                |             |                   |
| `background` |           |              |                |             |                   |
| `color`      |           |              |                |             |                   |
| `cycle`      |           |              |                |             |                   |
| `shadow`     | protected | `ShadowRoot` |                |             | AeroShadowElement |
| `innerHTML`  |           |              | `htmlTemplate` |             | AeroShadowElement |

### Methods

| Name                  | Privacy   | Description                                                                                                                                                                            | Parameters         | Return | Inherited From    |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ | ----------------- |
| `updateSpinnerStyles` | private   | Using :host instead of an inner element means styles are applied to the custom element itself.&#xD;&#xA;Re-appending styles multiple times can cause conflicts or unexpected behavior. |                    |        |                   |
| `query`               | protected |                                                                                                                                                                                        | `selector: string` | `T`    | AeroShadowElement |
| `applyStyles`         | protected |                                                                                                                                                                                        | `style: string`    |        | AeroShadowElement |

### Attributes

| Name         | Field | Inherited From |
| ------------ | ----- | -------------- |
| `width`      |       |                |
| `height`     |       |                |
| `background` |       |                |
| `color`      |       |                |
| `cycle`      |       |                |

<hr/>

## Exports

| Kind                        | Name                    | Declaration         | Module                                                  | Package |
| --------------------------- | ----------------------- | ------------------- | ------------------------------------------------------- | ------- |
| `js`                        | `default`               | AeroProgressSpinner | src/components/progress\_spinner/AeroProgressSpinner.ts |         |
| `custom-element-definition` | `aero-progress-spinner` | AeroProgressSpinner | src/components/progress\_spinner/AeroProgressSpinner.ts |         |
