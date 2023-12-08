export class ResourceHistory {
    id: number;
    date: string;
    action: string;
    userName: string;
    resourceName: string;
    taskName: string;

    constructor(partial: Partial<ResourceHistory>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}