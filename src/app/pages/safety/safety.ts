import { Component } from '@angular/core';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-safety',
  imports: [PageHero, CtaBanner],
  templateUrl: './safety.html',
  styleUrl: './safety.scss',
})
export class Safety {
  protected readonly practices = [
    'ANSI-aligned rigging and cutting practices on every climb',
    'Job-site hazard assessment before equipment leaves the truck',
    'PPE for all crew members — helmets, eye protection, chaps, and harnesses',
    'Clear drop zones and spotters when working near structures',
    'Electrical line awareness — we coordinate with utilities when needed',
  ];

  protected readonly credentials = [
    'General liability insurance (certificate on request)',
    'Workers’ compensation coverage for all employees',
    'ISA-informed pruning standards where applicable',
    'Written scope of work before chainsaws start',
  ];
}
