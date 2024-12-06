import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { DummyUser } from "./model/dummy-user.model";
import { GameRecord } from "./model/game-record.model";
import { User } from "src/app/infrastructure/auth/model/user.model";


@Injectable({
    providedIn: "root",
})
export class StakeholderService {

    constructor(private http: HttpClient) { }

  
    saveGameRecord(gameRecord: GameRecord): Observable<GameRecord> {
      return this.http.put<GameRecord>(environment.apiHost + 'GameRecord', gameRecord);
    }
    

      getByUsername(username: string): Observable<User> {
        return this.http.get<User>(
            environment.host + "username/" + username ,
        );
    }
}
