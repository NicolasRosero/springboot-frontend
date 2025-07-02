import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-detail-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css']
})
export class DetailPersonComponent implements OnInit {
  constructor () {}

  ngOnInit(): void {}
}
