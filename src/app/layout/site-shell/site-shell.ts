import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from '../site-footer/site-footer';
import { SiteHeader } from '../site-header/site-header';

@Component({
  selector: 'app-site-shell',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './site-shell.html',
  styleUrl: './site-shell.scss',
})
export class SiteShell {}
