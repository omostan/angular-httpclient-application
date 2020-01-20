import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  student: Student;

  constructor(public apiService: ApiService, public router: Router) {
    this.student = new Student();
   }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createItem(this.student).subscribe((response) => {
      console.log(`${response.name} aged ${response.age} is added to the students list`);
      this.router.navigate(['list']);
    });
  }

}
