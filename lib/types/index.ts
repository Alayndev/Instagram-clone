import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface PostType {
  image: string;
  texto: string;
  likes?: number;
  isVideo?: boolean;
  id: string;
}

export interface CreatePostType {
  image: string;
  texto?: string;
  isVideo?: boolean;
}

export type PostCreatedRes = {
  created: boolean;
  postId: string;
};

export type UpdateTextType = {
  texto: string;
};

export type UpdatedRes = {
  updated: boolean;
};

export interface InputProps {
  placeholder?: string;
  type: string;
  id: string;
  name: string;
  label: string;
  register: UseFormRegister<any>;
  [error: string]: any;
  defaultValue?: string;
}

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  text: string;
}
export interface InstagramCardProps {
  post: PostType;
  posts: PostType[];
  userName: string;
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}

export interface CreatePostFormProps {
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export interface EditTextFormProps {
  setEditText: Dispatch<SetStateAction<boolean>>;
  post: PostType;
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}

export interface ImageUploaderProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  [error: string]: any;
  dataType: string;
  value?: string;
  readOnly?: boolean;
}

export interface UpperSectionProps {
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}

export interface ShowImageProps {
  alt: string;
  src: string;
  className: string;
}

export interface InstagramStoryProps {
  src: string;
  userName?: string;
  closeFriends?: boolean;
}
