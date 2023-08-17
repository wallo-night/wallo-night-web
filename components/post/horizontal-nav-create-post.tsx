import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import Link from 'next/link';
import { useAuth } from '../util/session/context-user';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';
import { BiDetail } from "react-icons/bi";
import { LuFileAudio2 } from "react-icons/lu";
import { useRouter } from 'next/router';


const classIcon = "flex-shrink-0 w-10 h-10 text-gray-600 md:w-12 md:h-12";

const HorizontalNavCreatePost: React.FC<{ user?: any }> = ({ user }) => {
    const router = useRouter();
    const [navigation] = useState<NavbarProps[]>([
        {
            title: "Write a post",
            href: "/posts/create",
            description: `983 Available Posts`,
            icon: <BiDetail className={classIcon} />,
        },
        {
            title: "Audio post",
            href: "/posts/audio/create",
            description: `142 Available Audio Posts`,
            icon: <LuFileAudio2 className={classIcon} />,
        },
    ])


    return (
        <>
            {navigation.map((item: any, index: number) => {
                return (
                    <div key={index} onClick={() => router.push(item?.href)} className="bg-white border border-gray-200 rounded-xl hover:-translate-y-1 cursor-pointer">
                        <div className="p-6 lg:px-10 lg:py-8">
                            <div className="flex items-center justify-start space-x-3">
                                {item?.icon}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                                        {item?.title}
                                    </h3>
                                    <p className="mt-2 text-sm font-medium text-gray-500">{item?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export { HorizontalNavCreatePost }