import { HttpClient } from '@angular/common/http';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, toArray } from 'rxjs';
import { SortableHeader } from '../../common/directives/sortableHeader.directive';
import { CONTACTS_URL } from '../leads.constants';

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private data: Contact[];

  companyName: string;
  contacts: Contact[];

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('companyid');
    this.companyName = this.route.snapshot.paramMap.get('companyname');

    this.http.get(CONTACTS_URL).subscribe((data: any) => {
      data = data.filter((y) => y.companyId == id);
      this.data = data;
      this.contacts = data;
    });
  }

  gotoCompanies() {
    this.router.navigate(['/companies']);
  }

  //#region "Table events"

  rowClick(contact: Contact) {
    // send the company id to the next router element
    console.log('Row double clicked', contact);
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
      this.contacts = this.data;
    } else {
      this.contacts = [...this.data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  //#endregion
}

interface Contact {
  id: number;
  name: string;
  country: string;
  companyId: string;
  phone: string;
}
