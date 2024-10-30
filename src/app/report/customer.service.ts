import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }

    // getCustomersLarge() {
    //     return this.http.get<any>(environment.apiurl + '/getBookingHistory');

    // }

    getReportdata(data: any) {
        return this.http.post(environment.API + `/getBookingHistory`, {
            page: data.page,
            limit: data.limit
        });
    }
}