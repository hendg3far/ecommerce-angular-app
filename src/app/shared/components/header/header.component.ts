import { Component } from '@angular/core';
import { AuthRoutingModule } from "../../../features/auth/auth-routing.module";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuthRoutingModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
