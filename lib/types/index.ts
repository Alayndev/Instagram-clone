import { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

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
  register: UseFormRegister<FieldValues>;
  error?: any;
}

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  text: string;
}
