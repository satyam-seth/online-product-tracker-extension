export enum SupportedWebsites {
  AMAZON_IN,
  FLIPKART,
}

export interface WebsiteConfig {
  hostname: string;
  buttonContainerSelector: string;
}

export const websiteConfig: Record<SupportedWebsites, WebsiteConfig> = {
  [SupportedWebsites.AMAZON_IN]: {
    hostname: "www.amazon.in",
    buttonContainerSelector: "#corePriceDisplay_desktop_feature_div",
  },
  [SupportedWebsites.FLIPKART]: {
    hostname: "www.flipkart.com",
    buttonContainerSelector: ".C7fEHH",
  },
};

export function isSupportedWebsite(): boolean {
  const currentHostname = window.location.hostname;
  return Object.values(websiteConfig).some(
    (config) => config.hostname === currentHostname
  );
}

export function getWebsiteConfig(): WebsiteConfig | null {
  const currentHostname = window.location.hostname;
  for (const config of Object.values(websiteConfig)) {
    if (config.hostname === currentHostname) {
      return config;
    }
  }
  return null;
}

export function getButtonContainerSelector(): string | null {
  const config = getWebsiteConfig();
  return config ? config.buttonContainerSelector : null;
}
