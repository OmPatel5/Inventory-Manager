import { SessionProvider } from "@/components/SessionProvider";
import "tailwindcss/tailwind.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import CartPage from "../cart/page";
import InventoryPage from "../page";
import Error from "@/components/Error";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <div>
        {session?.user?.email === 'om.patel@lkdsb.com' ? 
        <div>
            {children}
        </div> : <Error />
        }
    </div>

  );
}
