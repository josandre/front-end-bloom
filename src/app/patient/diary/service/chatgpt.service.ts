import {Injectable} from "@angular/core";
import {API_URL} from "config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "@core";
import {Diary} from "../model/diary";
import {Entry} from "../model/entry";
import { ChatGPT } from 'chatgpt-api';


@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private chatgpt = new ChatGPT('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');

    public async chat(message: string): Promise<string> {
        try {
            const response = await this.chatgpt.query(message,
                {
                    temperature: 0.8,
                    max_tokens: 32,
                    model: 'gpt-3.5-turbo',
                    stream: false
                }
            );
            return response.text;
        } catch (error) {
            console.error(error);
            return 'Something went wrong.';
        }
    }
}
