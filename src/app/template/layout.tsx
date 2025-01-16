// "use client";
// import { useSession } from "next-auth/react";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/store/userSlice";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // const dispatch = useDispatch();
    // const { data: session } = useSession();
    // const params = useParams();
    // const router = useRouter();
    // const slug = params?.slug as string;

    // useEffect(() => {
    //     if (session?.user) {
    //         if (slug === session.user.id) {
    //             dispatch(setUser({
    //                 id: session.user.id,
    //                 name: session.user.name || '',
    //                 email: session.user.email || '',
    //             }));
    //         } else {
    //             router.push('/');
    //         }
    //     }
    // }, [session, slug, dispatch, router]);

    // Only render children if slug matches user id
    // if (session?.user?.id !== slug) {
    //     return null;
    // }

    return children;
};
