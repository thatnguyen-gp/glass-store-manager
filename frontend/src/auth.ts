import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Twitter from 'next-auth/providers/twitter';
import Facebook from 'next-auth/providers/facebook';
import Apple from 'next-auth/providers/apple';
import Instagram from 'next-auth/providers/instagram';
import Tiktok from 'next-auth/providers/tiktok';
import Linkedin from 'next-auth/providers/linkedin';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';


const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),

  Github({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),

  Twitter({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  }),

  Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }),

  Apple({
    clientId: process.env.APPLE_CLIENT_ID,
    clientSecret: process.env.APPLE_CLIENT_SECRET,
  }),

  Instagram({
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  }),

  Tiktok({
    clientId: process.env.TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
  }),

  Linkedin({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }),
  Credentials({
    credentials: {
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize(c) {
      if (c.password === '1234@qwer' && c.email === 'test@thatnguyen.com') {
        return {
          id: 'test',
          name: 'That Nguyen',
          email: String(c.email),
        };
      }
      return null;
    },
  }),
];

if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn('Missing environment variable "GOOGLE_CLIENT_ID"');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('Missing environment variable "GOOGLE_CLIENT_SECRET"');
}
if (!process.env.GITHUB_CLIENT_ID) {
  console.warn('Missing environment variable "GITHUB_CLIENT_ID"');
}
if (!process.env.GITHUB_CLIENT_SECRET) {
  console.warn('Missing environment variable "GITHUB_CLIENT_SECRET"');
}
if (!process.env.TWITTER_CLIENT_ID) {
  console.warn('Missing environment variable "TWITTER_CLIENT_ID"');
}
if (!process.env.TWITTER_CLIENT_SECRET) {
  console.warn('Missing environment variable "TWITTER_CLIENT_SECRET"');
}
if (!process.env.FACEBOOK_CLIENT_ID) {
  console.warn('Missing environment variable "FACEBOOK_CLIENT_ID"');
}
if (!process.env.FACEBOOK_CLIENT_SECRET) {
  console.warn('Missing environment variable "FACEBOOK_CLIENT_SECRET"');
}
if (!process.env.APPLE_CLIENT_ID) {
  console.warn('Missing environment variable "APPLE_CLIENT_ID"');
}
if (!process.env.APPLE_CLIENT_SECRET) {
  console.warn('Missing environment variable "APPLE_CLIENT_SECRET"');
}
if (!process.env.INSTAGRAM_CLIENT_ID) {
  console.warn('Missing environment variable "INSTAGRAM_CLIENT_ID"');
}
if (!process.env.INSTAGRAM_CLIENT_SECRET) {
  console.warn('Missing environment variable "INSTAGRAM_CLIENT_SECRET"');
}
if (!process.env.TIKTOK_CLIENT_ID) {
  console.warn('Missing environment variable "TIKTOK_CLIENT_ID"');
}
if (!process.env.TIKTOK_CLIENT_SECRET) {
  console.warn('Missing environment variable "TIKTOK_CLIENT_SECRET"');
}
if (!process.env.LINKEDIN_CLIENT_ID) {
  console.warn('Missing environment variable "LINKEDIN_CLIENT_ID"');
}
if (!process.env.LINKEDIN_CLIENT_SECRET) {
  console.warn('Missing environment variable "LINKEDIN_CLIENT_SECRET"');
}

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');

      return isPublicPage || isLoggedIn;
    },
  },
});
  