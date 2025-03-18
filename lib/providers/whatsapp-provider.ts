import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

interface WhatsAppProfile {
  id: string;
  name: string;
  phone: string;
  picture?: string;
}

export default function WhatsAppProvider(
  config: OAuthUserConfig<WhatsAppProfile>
): OAuthConfig<WhatsAppProfile> {
  return {
    id: "whatsapp",
    name: "WhatsApp",
    type: "oauth",
    authorization: `https://wa.me/send?phone=${process.env.WHATSAPP_PHONE_NUMBER}`,
    token: {
      url: `${process.env.NEXTAUTH_URL}/api/auth/whatsapp/token`,
    },
    userinfo: {
      url: `${process.env.NEXTAUTH_URL}/api/auth/whatsapp/userinfo`,
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: null,
        image: profile.picture,
        role: "USER",
      };
    },
    style: {
      logo: "/whatsapp.svg",
      bg: "#25D366",
      text: "#fff",
    },
    options: config,
  };
}