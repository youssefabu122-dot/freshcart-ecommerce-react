import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
    interface User {
        token: string,
        user: { name: string, email: string, role: string }
    }

    interface Session {
        user: User["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string,
        user: { name: string, email: string, role: string }
    }
}
