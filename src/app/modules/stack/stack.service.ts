import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SearchData, UserQuestionsRequestData } from './stack.models';

function fixedEncodeURI (str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

@Injectable()
export class StackService {

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  search({ query, page, pageSize = 10 }: SearchData) {
    return this.api.get(`/search`, {
      params: {
        order: 'desc',
        sort: 'creation',
        site: 'stackoverflow',
        pagesize: pageSize,
        page,
        intitle: query,
      }
    });
  }

  getQuestion(questionId: number) {
    return this.api.get(`/questions/${questionId}`, {
      params: {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow',
        filter: '!9Z(-wwYGT',
      }
    });
  }

  getQuestionAnswers(questionId: number) {
    return this.api.get(`/questions/${questionId}/answers`, {
      params: {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow',
        filter: '!9Z(-wzu0T',
      }
    });
  }

  getUserQuestions({ userId, page, pageSize = 10 }: UserQuestionsRequestData) {
    return this.api.get(`/users/${userId}/questions`, {
      params: {
        order: 'desc',
        sort: 'votes',
        site: 'stackoverflow',
        page,
        pagesize: pageSize,
      }
    });
  }

  redirectToSearchResult(query: string) {
    return this.router.navigate(['/stack/search/', query]);
  }

}
