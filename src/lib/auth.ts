import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { nanoid } from 'nanoid';
import Credentials from 'next-auth/providers/credentials';
import { LoginValidator } from './validators/login';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginValidator.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordsMatch = await bcrypt.compare(password, user.password);

					if (passwordsMatch) return user;
				}

				return null;
			},
			// @ts-ignore
			credentials: undefined,
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
				session.user.role = token.role;
			}

			return session;
		},
		async jwt({ token, user }: any) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (!dbUser) {
				token.id = user!.id;
				return token;
			}

			if (!dbUser.name) {
				await db.user.update({
					where: {
						id: dbUser.id,
					},
					data: {
						name: nanoid(10),
					},
				});
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
				role: dbUser.role,
			};
		},
		redirect() {
			return '/';
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions);
