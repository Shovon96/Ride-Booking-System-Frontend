import type { IBaseLayout } from "@/types/layout.types";
import Footer from "./Footer";
import { Navbar } from './Nav';
import { NavbarSkeleton } from '../skeletonLoading/NavbarSkeleton';
import { useUserDataQuery } from '@/redux/features/api/auth.api';
import { useEffect, useState } from "react";


export default function BaseLayout({ children }: IBaseLayout) {
    const { isLoading } = useUserDataQuery(undefined);

    const [navLoading, setNavLoading] = useState(true);

    useEffect(() => {
        // Simulate initial navbar load
        const timer = setTimeout(() => {
            setNavLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="min-h-screen flex flex-col">
            {navLoading || isLoading ? <NavbarSkeleton /> : <Navbar />}
            <div className="grow-1">
                {children}
            </div>

            <Footer />
        </div>
    );
}
