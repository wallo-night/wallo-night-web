/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Button } from "antd";
import { ReadMore } from "@/utils/read-more";
import { BiDotsHorizontal } from "react-icons/bi";
import { TransactionModel } from "@/types/transaction";
import { formateFromNow, formatePrice } from "@/utils";
import { capitalizeOneFirstLetter } from "@/utils/utils";
import { AvatarComponent } from "@/utils/avatar-component";

type Props = {
  item?: TransactionModel;
  index: number;
};

const ListTransactions: React.FC<Props> = ({ item, index }) => {
  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold text-gray-900">
          <div className="flex items-center flex-1 min-w-0">
            <AvatarComponent size={50} profile={item?.profileSend} />
            <div className="flex-1 min-w-0 ml-4">
              <p className="text-sm font-bold text-gray-900">
                {item?.profileSend?.firstName} {item?.profileSend?.lastName}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 hidden sm:table-cell">
                {item?.profileSend?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 sm:hidden">
                <ReadMore html={`${item?.profileSend?.email}`} value={15} />
              </p>
              <p className="lg:hidden mt-1 text-sm font-medium text-gray-500">
                {formateFromNow(item?.createdAt as Date)}
              </p>
            </div>
          </div>
        </td>

        <td className="hidden text-sm text-right font-bold text-gray-900 lg:table-cell">
          {formatePrice({
            value: Number(item?.amount ?? 0),
            isDivide: true,
          })}
          &nbsp;{item?.currency}
        </td>

        <td className="hidden text-sm text-right font-medium text-gray-900 lg:table-cell">
          <ReadMore html={`${item?.description}`} value={40} />
        </td>

        <td className="hidden text-sm text-right font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date)}
        </td>

        <td className="py-4 text-sm font-medium text-right text-gray-400">
          <Button
            type="text"
            shape="circle"
            icon={<BiDotsHorizontal className="w-5 h-5" />}
            size="small"
          />
          <div className="mt-1 lg:hidden pt-1">
            <div className="inline-flex items-center justify-end text-gray-900">
              {item?.type}
            </div>
            <p className="ml-2 inline-flex text-sm font-bold text-gray-900">
              {formatePrice({
                value: Number(item?.amount ?? 0),
                isDivide: true,
              })}
              &nbsp;{item?.currency}
            </p>
          </div>
        </td>
      </tr>
    </>
  );
};

export { ListTransactions };
