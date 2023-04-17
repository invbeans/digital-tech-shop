import { AnswerProdPage } from "./answer-prod-page";
import { QuestionProdPage } from "./question-prod-page";

export class QuestionAnswer {
    constructor(public question: QuestionProdPage,
        public answers: AnswerProdPage[]) { }
}