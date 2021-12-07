import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CONTACTS_URL } from '../../leads.constants';
import { Contact } from '../contacts.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  @Input() public contact: Contact;
  @Input() public editMode: boolean;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) {}

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
  });

  get name() {
    return this.contactForm.get('name');
  }
  get country() {
    return this.contactForm.get('country');
  }

  //#region API operations

  async add() {
    const result = await this.http
      .post(CONTACTS_URL, this.contactForm.value)
      .toPromise();
    if (result) alert('Contact added successfully');
  }

  async save() {
    const result = await this.http
      .put(CONTACTS_URL, this.contactForm.value)
      .toPromise();
    if (result) alert('Contact updated successfully');
  }

  async delete() {
    const result = await this.http
      .delete(`${CONTACTS_URL}/${this.contact.id}`)
      .toPromise();
    if (result) alert('Contact deleted successfully');
  }

  //#endregion
}
