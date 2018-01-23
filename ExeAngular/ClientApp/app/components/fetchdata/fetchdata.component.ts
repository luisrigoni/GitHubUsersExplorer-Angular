import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public users: GitHubUser[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get('https://api.github.com/users').subscribe(result => {
            this.users = result.json() as GitHubUser[];

        }, error => console.error(error));
    }
}

interface GitHubUser {
    id: number;
    login: string;
}
