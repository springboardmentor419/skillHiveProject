import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { email } from '../../../interfaces/auth';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule,],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  newsLetterForm: FormGroup;
  constructor(private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.newsLetterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  formSubmit() {
    const userEmail = { ...this.newsLetterForm.value };
    this.authService.addUserToNewsletter(userEmail as email).subscribe({
      next: (response) => {
        this.toastr.success('Thankyou for subscribing to our weekly newslatter', 'Subscribed Successfully');
      },
      error: (err) => {
        this.toastr.error('Something went wrong. Sorry for the inconvenience. Try again after some time.', 'Not subscribed');
      },
    });
  }

}
