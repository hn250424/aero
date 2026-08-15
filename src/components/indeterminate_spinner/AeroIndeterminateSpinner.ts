import { AeroShadowElement } from "@src/core/AeroShadowElement";
import aeroIndeterminateSpinnerHtmlTemplate from "./AeroIndeterminateSpinner.html?raw";

/**
 * @module components
 */

/**
 * A circular indeterminate spinner component.
 *
 * @extends AeroShadowElement
 *
 * Invalid or non-positive numeric attribute values fall back to their defaults.
 *
 * @attr {number} [size=50] - The size of the spinner in pixels.
 * @attr {number} [thickness=4] - The thickness of the spinner in pixels.
 * @attr {string} [track-color=transparent] - The color of the spinner's track.
 * @attr {string} [arc-color=black] - The color of the spinner's arc.
 * @attr {number} [cycle=2] - The duration of one spin cycle in seconds. Accepts fractional values (e.g. 0.5).
 * @attr {number} [arc-ratio=90] - The maximum length of the spinner arc, expressed as a percentage of the total circumference (1-100).
 */
export class AeroIndeterminateSpinner extends AeroShadowElement {
  private _size!: number;
  private _thickness!: number;
  private _radius!: number;
  private _circumference!: number;
  private _trackColor!: string;
  private _arcColor!: string;
  private _cycle!: number;
  private _arcRatio!: number;

  private _$svg!: SVGSVGElement;
  private _$track!: SVGCircleElement;
  private _$arc!: SVGCircleElement;

  constructor() {
    super(aeroIndeterminateSpinnerHtmlTemplate);

    this._syncHostAttributes();

    this._buildSvg();
    this._syncSvgAttributes();

    this._syncStyles();
  }

  private _buildSvg() {
    const NS = "http://www.w3.org/2000/svg";
    this._$svg = document.createElementNS(NS, "svg");
    this._$track = document.createElementNS(NS, "circle");
    this._$arc = document.createElementNS(NS, "circle");
    this._$track.classList.add("track");
    this._$arc.classList.add("arc");
    this._$svg.appendChild(this._$track);
    this._$svg.appendChild(this._$arc);
    this.shadow.appendChild(this._$svg);
  }

  static get observedAttributes() {
    return ["size", "thickness", "track-color", "arc-color", "cycle", "arc-ratio"];
  }

  attributeChangedCallback(
    _name: string,
    _oldValue: string | null,
    _newValue: string | null
  ) {
    this._syncHostAttributes();
    this._syncSvgAttributes();
    this._syncStyles();
  }

  private _syncHostAttributes() {
    this._size = this._parsePositive(this.getAttribute("size"), 50);
    this._thickness = this._parsePositive(this.getAttribute("thickness"), 4);
    // Keep the radius positive even when thickness is large relative to size.
    this._radius = Math.max(this._size / 2 - this._thickness - 1, 1);
    this._circumference = 2 * Math.PI * this._radius;
    this._trackColor = this.getAttribute("track-color") || "transparent";
    this._arcColor = this.getAttribute("arc-color") || "black";
    // parseFloat: 'cycle' accepts fractional seconds (e.g. 0.5).
    this._cycle = this._parsePositive(this.getAttribute("cycle"), 2);

    const ratio = parseFloat(this.getAttribute("arc-ratio") ?? "");
    this._arcRatio = (isNaN(ratio) ? 90 : Math.min(Math.max(ratio, 1), 100)) / 100;
  }

  // Parses a numeric attribute, falling back when the value is missing,
  // not a number, or not positive.
  private _parsePositive(raw: string | null, fallback: number): number {
    const n = parseFloat(raw ?? "");
    return isNaN(n) || n <= 0 ? fallback : n;
  }

  private _syncSvgAttributes() {
    this._$svg.setAttribute("viewBox", `0 0 ${this._size} ${this._size}`);
    this._$svg.setAttribute("width", String(this._size));
    this._$svg.setAttribute("height", String(this._size));

    this._$track.setAttribute("cx", String(this._size / 2));
    this._$track.setAttribute("cy", String(this._size / 2));
    this._$track.setAttribute("r", String(this._radius));

    this._$arc.setAttribute("cx", String(this._size / 2));
    this._$arc.setAttribute("cy", String(this._size / 2));
    this._$arc.setAttribute("r", String(this._radius));
  }

  private _syncStyles() {
    // The collapsed arc length at the start/end of the cycle.
    // Clamped so the gap (circumference - collapsedArc) never goes negative
    // on very small spinners, which would invalidate the dasharray.
    const collapsedArc = Math.min(10, this._circumference);

    this.applyStyles(`
      :host {
        width: ${this._size}px;
        height: ${this._size}px;
      }

      .track {
        fill: none;
        stroke: ${this._trackColor};
        stroke-width: ${this._thickness};
      }

      .arc {
        fill: none;
        stroke: ${this._arcColor};
        stroke-width: ${this._thickness};

        stroke-dasharray: ${this._circumference};
        stroke-dashoffset: ${this._circumference};

        transform-origin: center;

        animation:
          spin ${this._cycle}s linear infinite,
          arc ${this._cycle}s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes arc {
        0% {
          stroke-dasharray: ${collapsedArc} ${this._circumference - collapsedArc};
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: ${this._circumference * this._arcRatio} ${this._circumference - (this._circumference * this._arcRatio)};
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dasharray: ${collapsedArc} ${this._circumference - collapsedArc};
          stroke-dashoffset: ${this._circumference * -1};
        }
      }
    `);
  }
}


