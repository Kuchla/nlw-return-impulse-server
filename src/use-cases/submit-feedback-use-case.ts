import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;


        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid image');
        }

        if (!type) {
            throw new Error('Invalid type');
        }

        await this.feedbacksRepository.create({

            type,
            comment,
            screenshot

        });
        await this.mailAdapter.sendMail({
            subject: 'Novo FeedBack',
            body: [
                `<div>`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                `</div>`
            ].join('\n')
        })
    }
}

