import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { MessageService } from "primeng/api";
import { CustomerService } from './customer.service';
import { Table } from 'primeng/table'
import * as XLSX from 'xlsx';
import { ExcelServiceService } from '../excel-service.service';
import { DatePipe } from '@angular/common';
type AOA = any[][];
@ViewChild('p-calendar')

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [CustomerService, DatePipe],
})
export class ReportComponent implements OnInit {

  customer: any;
  table: any;
  employeeData: any;
  calendar: any | undefined;
  value_1: any;
  value: any;

  constructor(private customerService: CustomerService, private datePipe: DatePipe) { }

  data: AOA = [["id", "empId", "name", "email", "deptName", "roomNumber", "bedNumber", "loggedInDate", "loggedOutDate",]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'reportJS.xlsx';



  ngOnInit(): void {
    //this.showData();
    this.showreportdata();




    // this.customerService.getReportdata(data).subscribe((customers: any) => {
    //   console.log(customers);

    //   this.employeeData = this.employeeData.data;
    //   this.loading = false;

    //   this.customer.forEach(
    //     (        customer: { date: string | number | Date; }) => (customer.date = new Date(customer.date))
    //   );
    // });

    // this.representatives = [
    //   { name: "Amy Elsner", image: "amyelsner.png" },
    //   { name: "Anna Fali", image: "annafali.png" },
    //   { name: "Asiya Javayant", image: "asiyajavayant.png" },
    //   { name: "Bernardo Dominic", image: "bernardodominic.png" },
    //   { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    //   { name: "Ioni Bowcher", image: "ionibowcher.png" },
    //   { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    //   { name: "Onyama Limba", image: "onyamalimba.png" },
    //   { name: "Stephen Shaw", image: "stephenshaw.png" },
    //   { name: "XuXue Feng", image: "xuxuefeng.png" }
    // ];

    // this.statuses = [
    //   { label: "Unqualified", value: "unqualified" },
    //   { label: "Qualified", value: "qualified" },
    //   { label: "New", value: "new" },
    //   { label: "Negotiation", value: "negotiation" },
    //   { label: "Renewal", value: "renewal" },
    //   { label: "Proposal", value: "proposal" }
    // ];
  }

  // showData(){
  //   this.customerService.getCustomersLarge().subscribe((res)=>{
  //   this.employeeData=res.data;
  //   console.log(res.data);
  //   })
  // }

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

  loggedOut() {
    this.showreportdata();

    setTimeout(() => {
      let c = this.datePipe.transform(this.value_1, "yyyy-MM");

      let out: any = [];

      this.employeeData.forEach((item: any) => {
        let d = this.datePipe.transform(item.loggedOutDate,"yyyy-MM");
        if (c == d) {
          out.push(item);
        }
      });

      this.employeeData = out;
    }, 1000);

  }

  showreportdata() {
    this.customerService.getReportdata().subscribe((res) => {
      this.employeeData = res;
    })
  }

  clear(table: Table) {
    table.clear();
    this.resetdate();

  }


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
    /* generate worksheet */
    this.employeeData.forEach((item: any) => {
      this.data.push(Object.values(item).map((value: any) => [value, item[value]]))
    })
    console.log(this.data);

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


}

