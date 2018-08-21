import {AuthServiceConfig, FacebookLoginProvider} from "angularx-social-login";

export function getAuthServiceConfigs() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("442933846208287")
    }
  ]);
}
