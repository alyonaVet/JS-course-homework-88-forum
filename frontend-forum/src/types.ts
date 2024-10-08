export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface PostCredentials {
  _id: string;
  "user": {
    "_id": string;
    "username": string;
  },
  "title": string;
  "datetime": string;
  "description": string | null;
  "image": string | null;
}

export interface PostFields {
  user: string;
  title: string;
  description: string | null;
  image: string | null;
}

export interface CommentFields {
  post: string;
  content: string;
}

export interface CommentCredentials {
  _id: string;
  "user": {
    _id: string;
    username: string;
  },
  "post": string;
  "content": string;
}