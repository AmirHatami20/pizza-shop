'use client';

import {SessionProvider} from 'next-auth/react';
import {ReactNode} from 'react';
import {Session} from "next-auth";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function ClientLayout({children, session}: { children: ReactNode, session: Session | null }) {
    const queryClient = new QueryClient()

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}
