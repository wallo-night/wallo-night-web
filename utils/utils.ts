import { UploadFile } from "antd";

export interface KeyAsString {
  [key: string]: string;
}

export interface KeyAsStringNumber {
  [key: string]: number;
}

export const capitalizeName = (s: string) => {
  if (typeof s !== "string") return "";
  const v = s.toLowerCase();
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const capitalizeFirstLetter = (value: string): string => {
  const valueLower = String(value).toLowerCase();
  return valueLower.charAt(0).toUpperCase() + valueLower.slice(1);
};

/** Fix date */
export const capitalizeOneFirstLetter = (fullItem: string) => {
  return capitalizeName(fullItem).substring(0, 2).toUpperCase();
};

/** Fix truncate */
export const truncateInput = (input: string, value: number) => {
  return input?.length > value ? `${input.substring(0, value)}...` : input;
};


export const filterImageAndFile = (options: {
  imageList: UploadFile[];
  fileList: UploadFile[];
}) => {
  let newFileLists: any = [];
  let newImageLists: any = [];
  const { imageList, fileList } = options;
  
  imageList
    .filter((file: any) => file?.status === "success")
    .forEach((file: any) => {
      newImageLists.push(file);
    });

  fileList
    .filter((file: any) => file?.status === "success")
    .forEach((file: any) => {
      newFileLists.push(file);
    });

  return { newFileLists, newImageLists };
};
