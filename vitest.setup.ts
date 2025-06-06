/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

class PointerEvent extends Event {
  constructor(type: string, props: any) {
    super(type, props);
    this.pointerId = props.pointerId ?? 0;
    this.pressure = props.pressure ?? 0;
    this.clientX = props.clientX ?? 0;
    this.clientY = props.clientY ?? 0;
    this.pointerType = props.pointerType ?? 'mouse';
  }
  pointerId: number;
  pressure: number;
  clientX: number;
  clientY: number;
  pointerType: string;
}

Object.defineProperties(window.HTMLElement.prototype, {
  scrollIntoView: {
    value: () => {},
    configurable: true,
  },
  offsetHeight: {
    get() { return 0; },
    configurable: true,
  },
  offsetWidth: {
    get() { return 0; },
    configurable: true,
  }
});

Element.prototype.setPointerCapture = function(pointerId: number) {};
Element.prototype.releasePointerCapture = function(pointerId: number) {};
Element.prototype.hasPointerCapture = function(pointerId: number) { return false; };

global.PointerEvent = PointerEvent as any;

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
