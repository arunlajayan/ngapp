import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import ApexCharts from "apexcharts";
import { PollVote } from "src/app/types";

@Component({
  selector: "app-poll-vote",
  templateUrl: "./poll-vote.component.html",
  styleUrls: ["./poll-vote.component.scss"],
})
export class PollVoteComponent implements AfterViewInit {
  @Input() voted: boolean;
  @Input() options: string[];
  @Input() results: number[];
  @Input() question: string;
  @Input() id: number;

  @Output() pollVotedEvent: EventEmitter<PollVote> = new EventEmitter();

  voteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      selected: this.fb.control("", [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }

  ngOnInit() {}

  submitForm() {
    const pollVoted: PollVote = {
      id: this.id,
      vote: this.voteForm.get("selected").value,
    };

    this.pollVotedEvent.emit(pollVoted);
  }

  generateChart() {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.results,
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "45%",
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: this.options,
      },
    };

    const chart = new ApexCharts(
      document.getElementById("poll-results"),
      options
    );

    chart.render();
  }
}
