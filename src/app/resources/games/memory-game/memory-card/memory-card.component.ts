import { Component, Input } from '@angular/core';
import { MemoryCard } from '../../logic/memory-card';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent {
  @Input() memoryCard?:MemoryCard;

  constructor() { }
}
