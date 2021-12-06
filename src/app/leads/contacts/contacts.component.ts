import { HttpClient } from '@angular/common/http';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
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
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  private data: Contact[];

  companyName: string;
  contacts: Contact[];

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('companyid');
    this.companyName = this.route.snapshot.paramMap.get('companyname');

    this.http
      .get(CONTACTS_URL)
      .pipe(filter((x: Contact) => x.companyId === id))
      .subscribe((data: any) => {
        this.data = data;
        this.contacts = data;
      });
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
