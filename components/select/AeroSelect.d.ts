import { AeroShadowElement } from '../../core/AeroShadowElement';
/**
 * Events fired by the `<aero-select>` component.
 */
export interface AeroSelectEvents {
    /** Fired when the selected option changes. */
    "aero-select-changed": {
        /** The newly selected option element. */
        option: HTMLElement;
        /** The zero-based index of the selected option. */
        index: number;
    };
}
/**
 * @module components
 */
/**
 * `<aero-select>` is a custom select element that provides a customizable dropdown selection.
 * It uses `<aero-option>` elements as its options.
 *
 * @element aero-select
 * @fires aero-select-changed - Fired when the selected option changes.
 *
 * @slot - Default slot for `<aero-option>` elements.
 *
 * @cssprop [--aero-select-width=100%] - Default width of the select component.
 * @cssprop [--aero-select-height=36px] - Default height of the select component.
 * @cssprop [--aero-select-font-size=16px] - Font size for the select text.
 * @cssprop [--aero-select-font-family=san-serif] - Font family for the select text.
 * @cssprop [--aero-select-border=1px solid #000] - Border style for the select component.
 * @cssprop [--aero-select-dropdown-border=1px solid #000] - Border style for the dropdown container.
 * @cssprop [--aero-select-dropdown-z-index=100] - Z-index for the dropdown container.
 * @cssprop [--aero-select-dropdown-item-border=1px solid grey] - Border style for individual dropdown items.
 * @cssprop [--aero-select-dropdown-item-background=#fff] - Background color for individual dropdown items.
 * @cssprop [--aero-select-dropdown-item-color=#000] - Text color for individual dropdown items.
 * @cssprop [--aero-select-dropdown-hover-item-border=1px solid grey] - Border style for dropdown items on hover.
 * @cssprop [--aero-select-dropdown-hover-item-background=#000] - Background color for dropdown items on hover.
 * @cssprop [--aero-select-dropdown-hover-item-color=white] - Text color for dropdown items on hover.
 * @cssprop [--aero-select-dropdown-hover-item-cursor=pointer] - Cursor style for dropdown items on hover.
 * @cssprop [--aero-select-span-background=transparent] - Background color for the displayed selected option text.
 * @cssprop [--aero-select-span-border=1px solid transparent] - Border style for the displayed selected option text.
 * @cssprop [--aero-select-button-border=1px solid #000] - Border style for the dropdown toggle button.
 * @cssprop [--aero-select-button-background=lightgrey] - Background color for the dropdown toggle button.
 * @cssprop [--aero-select-button-color=#000] - Text color for the dropdown toggle button.
 * @cssprop [--aero-select-button-hover-border=1px solid #000] - Border style for the dropdown toggle button on hover.
 * @cssprop [--aero-select-button-hover-background=grey] - Background color for the dropdown toggle button on hover.
 * @cssprop [--aero-select-button-hover-color=#000] - Text color for the dropdown toggle button on hover.
 * @cssprop [--aero-select-button-hover-cursor=pointer] - Cursor style for the dropdown toggle button on hover.
 *
 * @extends AeroShadowElement
 */
export declare class AeroSelect extends AeroShadowElement<AeroSelectEvents> {
    private _handlers;
    private _$span;
    private _$button;
    private _$dropdown;
    private _$options;
    private _optionIndex;
    private _dropdown_open;
    private _$slot;
    private _highlightIndex;
    private _pendingOptionIndex?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleDocumentClick;
    private _handleButtonClick;
    private _openDropdown;
    private _closeDropdown;
    private _handleDropdownClick;
    private _handleSlotChange;
    private _handleKeydown;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private _aeroSelectAttributeHandlers;
    /**
     * The zero-based index of the currently selected option.
     * Setting this property will update the displayed value and fire the `aero-select-changed` event.
     * @type {number}
     * @attr option-index
     * @default -1
     */
    get optionIndex(): number;
    set optionIndex(option: number);
    private _updateOptionIndex;
    private _getValidateOptionIndexByStr;
    private _unsetOption;
}
