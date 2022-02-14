import { castArrayToObject } from './cast';

export function queryElement<
  K extends keyof (HTMLElementTagNameMap | SVGElementTagNameMap)
>(
  selector: K | string,
  parent: Document | HTMLElement | SVGElement = document
) {
  return parent.querySelector(selector);
}

export function queryGroupBySelector<R extends Record<keyof R, R[keyof R]>>(
  selectors: Record<keyof R, string>
) {
  const keySelectorMap = Object.entries(selectors);

  const mapFn = ([key, selector]) => ({ [key]: queryElement(selector) });

  return castArrayToObject(keySelectorMap.map(mapFn)) as R;
}
