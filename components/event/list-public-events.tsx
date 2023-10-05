/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Image } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineModeEdit,
} from "react-icons/md";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { HtmlParser } from "@/utils/html-parser";
import { IoShareOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../util/context-user";
import Link from "next/link";
import { EventModel } from "@/types/event";

type Props = {
  item?: EventModel;
  commentTake: number;
};

const ListPublicEvents: React.FC<Props> = ({ item, commentTake }) => {
  const userVisiter = useAuth() as any;
  const router = useRouter();
  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            <div className="cursor-pointer">
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDMYHH(item?.createdAt as Date)}
              </p>
            </div>

            <div className="ml-auto">
              <button
                title="Share"
                className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
              >
                <IoShareOutline className="w-5 h-5" />
              </button>
              {/* {item?.allowDownload ? (
                <button
                  title="Download"
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              ) : null} */}

              {userVisiter?.id === item?.userId ? (
                <>
                  <button
                    onClick={() => router.push(`/events/${item?.id
                      }/edit`)}
                    title="Edit"
                    className="ml-2 text-gray-600 hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <MdOutlineModeEdit className="w-5 h-5" />
                  </button>

                  <button
                    // onClick={() => deleteItem(item)}
                    title="Delete"
                    className="ml-2 text-gray-600 hover:text-red-400 focus:ring-red-400"
                  >
                    <MdDeleteOutline className="w-5 h-5" />
                  </button>
                </>
              ) : null}
            </div>
          </div>

        

          {/* {item?.image ? (
            <div className="mt-2">
              <Image
                width="100%"
                height="100%"
                preview={false}
                src={`${getOneFileGalleryAPI(String(item?.image))}`}
                alt={item?.title}
              />
            </div>
          ) : null} */}

          {item?.id ? (
            <Link
              href={`/${item?.profile?.username}/events/${item?.slug}`}
              className="mt-4 text-lg font-bold text-gray-900 cursor-pointer"
            >
              {item?.title ?? ""}
            </Link>
          ) : null}

          <p className="mt-4 text-sm font-normal text-gray-600">
            <HtmlParser html={String(item?.description)} />
          </p>

         
        </div>
      </div>
    </>
  );
};

export default ListPublicEvents;