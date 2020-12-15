export interface ElementOptions {
  attributes?: { [key: string]: string };
  classNames?: string[];
  events?: { [key: string]: EventListener };
}

export const createElement = (elementName: string, elementOptions?: ElementOptions): HTMLElement => {
  const element = document.createElement(elementName);
  const attributes = elementOptions?.attributes || {};
  const classNames = elementOptions?.classNames || [];
  const events = elementOptions?.events || {};

  Object.keys(attributes).forEach((attribute: string) => element.setAttribute(attribute, attributes[attribute]));
  classNames.forEach((className: string) => element.classList.add(className));
  Object.keys(events).forEach((event: string) => element.addEventListener(event, events[event]));
  return element;
};
