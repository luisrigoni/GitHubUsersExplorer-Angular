import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public details: GitHubUserDetails;
    public repos: GitHubRepo[];

    constructor(http: Http, route: ActivatedRoute) {
        let login = route.snapshot.params["login"];

        http.get('https://api.github.com/users/' + login).subscribe(result => {
            this.details = result.json() as GitHubUserDetails;
        }, error => console.error(error));

        http.get('https://api.github.com/users/' + login + '/repos').subscribe(result => {
            this.repos = result.json() as GitHubRepo[];
        }, error => console.error(error));
    }
}

interface GitHubUserDetails {
    id: number;
    login: string;
    html_url: string;
    public_repos: number;
    created_at: string;
}

interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
}
