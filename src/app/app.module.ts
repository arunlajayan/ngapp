import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PollCreateComponent } from "./components/poll-create/poll-create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PollComponent } from "./components/poll/poll.component";
import { PollVoteComponent } from "./components/poll-vote/poll-vote.component";
import { PollService } from "./services/poll.service";
import { Web3Service } from "./blockchain/web3.service";

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollComponent,
    PollVoteComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [PollService, Web3Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
