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
  body: string;
  link: string;
}

export interface SearchResults {
  items: Question[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
