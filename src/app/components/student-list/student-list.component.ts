import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  studentsData: any;

  constructor(public apiService: ApiService) {
    this.studentsData = [];
   }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.studentsData = response;
    });
  }

  delete(item) {
    // Delete item in the student data
    const del = item;
    this.apiService.deleteItem(item.id).subscribe(response => {
      // Update list after delete is successful
      console.log(`${del.name} with the ${del.id} has been deleted from the student list`);
      this.getAllStudents();
    });
  }

}
