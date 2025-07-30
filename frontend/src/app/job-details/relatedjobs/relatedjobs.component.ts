import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-relatedjobs',
  imports: [CommonModule, RouterLink],
  templateUrl: './relatedjobs.component.html',
  styleUrl: './relatedjobs.component.css'
})
export class RelatedjobsComponent {
  @Input() relatedJobs!: any[];

  getPlainText(html: string) {
    const text = document.createElement('div')
    text.innerHTML = html
    return text.textContent || text.innerText || '';
  }
}
