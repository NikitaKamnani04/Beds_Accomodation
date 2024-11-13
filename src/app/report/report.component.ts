import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { MessageService } from "primeng/api";
import { CustomerService } from './customer.service';
import { Table } from 'primeng/table'
import * as XLSX from 'xlsx';
import { ExcelServiceService } from '../excel-service.service';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import * as Excel from 'exceljs';

type AOA = any[][];
@ViewChild('p-calendar')

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [CustomerService, DatePipe],
})
export class ReportComponent implements OnInit {
  first = 0;
  employee: any;
  table: any;
  employeeData: any;
  calendar: any | undefined;
  value_1: any;
  value: any;
  page: any;
  rows: any;
totalCount:any;
  constructor(private customerService: CustomerService, private datePipe: DatePipe,private router :Router) { }

  data: AOA = [['Name', 'Email', 'DeptName', 'RoomNumber', 'BedNumber', 'LoggedInDate', 'LoggedOutDate']];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'reportJS.xlsx';



  ngOnInit(): void {
    //this.showData();

    this.showreportdata();

  }
  ngAfterViewInit() {
   
  }
  // showData(){
  //   this.customerService.getCustomersLarge().subscribe((res)=>{
  //   this.employeeData=res.data;
  //   console.log(res.data);
  //   })
  // }

  // to filter the login date
  loggedIn() {
    this.showreportdata();
    // console.log(this.value);
    setTimeout(() => {
      let a = this.datePipe.transform(this.value, "yyyy-MM");
      let out: any = [];

      this.employeeData.forEach((item: any) => {
        let b = this.datePipe.transform(item.loggedInDate, "yyyy-MM");
        if (a == b) {
          out.push(item);
        }
      });

      this.employeeData = out;
    }, 1000);
  }


// to filter the logout date
  loggedOut() {
    this.showreportdata();

    setTimeout(() => {
      let c = this.datePipe.transform(this.value_1, "yyyy-MM");

      let out: any = [];

      this.employeeData.forEach((item: any) => {
        let d = this.datePipe.transform(item.loggedOutDate, "yyyy-MM");
        if (c == d) {
          out.push(item);
        }
      });

      this.employeeData = out;
    }, 1000);

  }

  // show data in the table
  showreportdata() {
    this.customerService.getReportdata({}).subscribe((res: any) => {

      // export to excel
      this.employeeData = res.data.map((item: any) => {
        return {
          name: item.name,
          email: item.email,
          deptName: item.deptName,
          roomNumber: item.roomNumber,
          bedNumber: item.bedNumber,
          loggedInDate: item.loggedInDate,
          loggedOutDate: item.loggedOutDate
        }
      });

      // we want count at the same time of data load
      this.totalCount =res.pagination.totalCount;
      console.log(this.totalCount);
      // console.log(this.employeeData);
    })
  }

  // clear the entered data
  clear(table: Table) {
    table.clear();
    this.showreportdata();
    this.resetdate();
  }


  // to export the file in excel 
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  export(): void {

    // to make the space in excel columns
    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true
    };

    let workbook = new Excel.Workbook();

    var worksheet = workbook.addWorksheet('My Sheet',);
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30},
      { header: 'Department', key: 'deptName', width: 20},
      { header: 'RoomNumber', key: 'roomNumber', width: 15,},
      { header: 'BedNumber', key: 'bedNumber', width: 15, },
      { header: 'LoggedInDate', key: 'loggedInDate', width: 20, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'loggedOutDate', key: 'loggedOutDate', width: 20, style: { numFmt: 'dd/mm/yyyy' } },
    ];

   this.employeeData.forEach((i:any)=>{
   console.log(i);
   worksheet.addRow(i);
})
    let fileName = "reportJS.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
      .then(function (buffer: any) {
        // done buffering
        const data: Blob = new Blob([buffer], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fileSaver.saveAs(data, fileName);
      });

    this.employeeData.forEach((item: any) => {
      this.data.push(Object.values(item))
    })

    // console.log(this.data);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  resetdate() {
    this.value_1 = undefined;
    this.value = undefined;
  }

  paginator(event: any) {

    console.log(event);
    
    let data = {
      page: event.page + 1,
      limit: event.rows,
    }
    console.log(data);
    this.customerService.getReportdata(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.employeeData = res.data;
      }, error(err) {
        console.log(err);

      }
    })
  }

  logout(){
    this.router.navigate(['']);
    setTimeout(() => {
      window.location.reload();
      
    }, 250);
  }
}





