import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  id: number;
  student: Student;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.student = new Student();
   }

  ngOnInit() {
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.id = this.activatedRoute.snapshot.params[`id`];
    // Get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(`${response.name} with the Id: ${response.id} has been selected for update`);
      this.student = response;
    });
  }

  update() {
    // Update item by id and updated data object
    this.apiService.updateItem(this.id, this.student).subscribe(response => {
      console.log(`${response.name}'s data with the Id: ${this.id} has been updated`);
      this.router.navigate(['list']);
    });
  }
}
