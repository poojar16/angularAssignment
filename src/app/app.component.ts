import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from './services/common.service';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular assignment';

  @ViewChild(MatSort) sort!: MatSort; // viewchild decorator 

  private service = inject(CommonService); // inject commonService

  constructor() { }

  ELEMENT_DATA: any[] = [];
  displayedColumns = ['No.','name', 'username', 'email', 'address', 'phone'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.getData(); // api call
    this.getProduct(); // api call
  }

  getData() {
    this.service.getData().subscribe((res: any) => {
      this.ELEMENT_DATA = res;
      console.log(this.dataSource.data);
      this.dataSource.data = this.ELEMENT_DATA;
      console.log(this.dataSource);
    },err=>{
      alert(err)
    });
  }
  ngAfterViewInit(): void { // lifecycle hook 
    this.dataSource.sort = this.sort; // change detect when sort 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // convert to lowercase 
  }

  // Another method for displaying Table
  titlee: any;
  tableData: any;
  getProduct() {
    this.service.getProduct().subscribe((res: any) => { //api call 
      this.tableData = res; // assign response to tabledata variable
    },err=>{
      alert(err)
    })
  }
  search() {
    if (this.titlee === "") {
      this.getProduct(); // re-call api
    } else {
      const searchTerm = this.titlee.toLocaleLowerCase();
      this.tableData = this.tableData.filter((res: any) => {
        const nameLower = res.title.toLocaleLowerCase();
        return nameLower.includes(searchTerm); // when match then match tem assign in tabledata
      });
    }
  }

  key = 'id'; // by default id 
  reverse: boolean = false;
  sortt(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
    this.tableData.sort((a: any, b: any) => { // reverse 
      if (a[key] < b[key]) {
        return this.reverse ? 1 : -1; // when reverse true then 1 else -1
      }
      if (a[key] > b[key]) {
        return this.reverse ? -1 : 1;
      }
      return 0;
    });
  }

  isExpanded: boolean = false;
  toggleDescription() {
    this.isExpanded = !this.isExpanded; // toggle 
  }
}
