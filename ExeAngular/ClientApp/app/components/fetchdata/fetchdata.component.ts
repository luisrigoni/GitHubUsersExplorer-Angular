import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: GitHubUser[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get('https://api.github.com/users').subscribe(result => {
            this.forecasts = result.json() as GitHubUser[];

            this.forecasts.forEach(function (item) {
                http.get('https://api.github.com/users/' + item.login).subscribe(result => {
                    let user = result.json();
                    item.public_repos = user.public_repos;
                    item.created_at = user.created_at;

                }, error => console.error(error))
            });
        }, error => console.error(error));
    }
}

interface GitHubUser {
    id: number;
    login: string;
    html_url: string;
    public_repos: number;
    created_at: string;
}
