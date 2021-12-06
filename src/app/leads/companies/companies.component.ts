import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  SortableHeader,
  SortEvent,
} from '../../common/directives/sortableHeader.directive';
import { COMPANIES_GET } from '../leads.constants';

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private data: Company[];
  companies: Company[];

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  ngOnInit() {
    this.http.get(COMPANIES_GET).subscribe((data: any) => (this.data = data));
  }

  onSort({ column, direction }: any) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.companies = this.data;
    } else {
      this.companies = [...this.data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
}
