export interface SearchData {
  query: string;
  page: number;
}

export interface StackUser {
  user_id: number;
  display_name: string;
  profile_image: string;
  link: string;
}

export type QuestionId = number;
export type AnswerId = number;
export type HTMLString = string;

export interface Question {
  question_id: QuestionId;
  tags: string[];
  owner: StackUser;
  is_answered: boolean;
  view_count: number;
  favorite_count: number;
  down_vote_count: number;
  up_vote_count: number;
  answer_count: number;
  score: number;
  title: string;
  body: HTMLString;
  link: string;
}

export interface Answer {
  answer_id: AnswerId;
  question_id: QuestionId;
  owner: StackUser;
  is_accepted: boolean;
  score: number;
  creation_date: number;
  body: HTMLString;
}

export interface ResponseList<T> {
  items: T[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
