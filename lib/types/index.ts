import { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface PostType {
  image: string;
  texto: string;
  likes: number;
}

export interface CreatePostType {
  image: string;
  texto?: string;
}

export type PostCreatedRes = {
  created: boolean;
  postId: string;
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
  onClick: MouseEventHandler<HTMLButtonElement>;
  className: string;
  children: ReactNode;
}
