// @ts-expect-error myThirdPartyLibrary is added via a script tag in production
globalThis.myThirdPartyLibrary = {
  setup: () => {},
};
