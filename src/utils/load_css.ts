/**
 * Previously loading/loaded css stylesheets that have been requested by `loadCss()`.
 */
let cachedCss: Record<string, Promise<void>> = {};

/**
 * Asynchronously loads a css keeping track of which css have already
 * requested and loaded.
 *
 * Multiple requests to the same resource will return the same promise.
 *
 * @param {string} href - used to set the css href.
 * @return {Promise<void>} returns a promise to indicate if the css was successfully loaded.
 */
export function loadCss(href: string): Promise<void> {
  const existing = cachedCss[href];
  if (existing) {
    return existing;
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (findCss(href)) {
      resolve();
    }

    const css = createLinkElement(href);

    const onCssLoad = (): void => {
      resolve();
    };

    const onCssError = (): void => {
      cleanup();
      delete cachedCss[href];
      css.remove();

      const defaultError = new Error(`The css "${href}" failed to load.`);
      reject(defaultError);
    };

    css.addEventListener('load', onCssLoad);
    css.addEventListener('error', onCssError);

    document.head.insertBefore(css, document.head.firstElementChild);

    function cleanup(): void {
      css.removeEventListener('load', onCssLoad);
      css.removeEventListener('error', onCssError);
    }
  });

  cachedCss[href] = promise;

  return promise;
}


/**
 * Find css href in the DOM
 * @param {string} href - used to set the css href.
 * @return {boolean | null} returns `true` if css link exist otherwise `null`.
 */
function findCss(href: string): boolean | null {
  const currentCss: HTMLLinkElement | null = document.querySelector(`link[href="${href}"]`);
  if (currentCss === null) {
    return null
  }
  return true;
}


/**
 * Creates Link Element
 * @param {string} href - the css href
 * @return {HTMLScriptElement} returns the newly created script.
 */
function createLinkElement(href: string): HTMLLinkElement {
  const newLink: HTMLLinkElement = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.type = "text/css";
  newLink.href = href;
  return newLink;
}


/**
 * Clears the css cache. For testing purposes only.
 */
export function clearCssCache(): void {
  cachedCss = {};
}
