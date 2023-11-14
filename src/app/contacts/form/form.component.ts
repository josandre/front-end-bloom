import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Contact } from '../contacts.model';

export interface DialogData {
  action: string;
  contact: Contact;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  action: string;
  dialogTitle?: string;
  contactForm: FormGroup;
  isDetails = false;
  contact: Contact;
  isLoading = false; // Agregar una variable para controlar el preloader
  @Output() contactAdded: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  
    public contactsService: ContactsService,
    private fb: FormBuilder,
    
  ) {
    this.action = data.action;
    this.contact = this.action === 'edit' ? data.contact : Contact.createEmpty();
    this.dialogTitle = this.action === 'edit' ? 'Editar Contacto' : 'Nuevo Contacto';
    this.isDetails = this.action === 'details';
    this.contactForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.contact.id],
      name: [this.contact.name, Validators.required],
      email: [this.contact.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      relation: [this.contact.relation, Validators.required]
    });
  }

  confirmAddOrUpdate(): void {
    if (!this.contactForm.valid) {
      return;
    }
    this.isLoading = true; // Activa el spinner
    const formValues = this.contactForm.getRawValue();
    const userId = this.contactsService.currentUser.id; // Asumiendo que puedes obtener el id del usuario conectado desde el servicio

    const contactData = {
      ...formValues,
      user: { id: userId }
    };
  
    if (this.action === 'add') {
      this.contactsService.addContact(contactData).subscribe({
        next: (newContact) => {
          this.isLoading = false; // Detiene el spinner
          this.dialogRef.close(newContact);
        },
        error: (error) => {
          this.isLoading = false; // Detiene el spinner incluso si hay un error
          console.error('Error adding contact:', error);
        }
      });
    } else if (this.action === 'edit') {
      this.contactsService.updateContacts(contactData).subscribe({
        next: (updatedContact) => {
          this.isLoading = false; 
          this.dialogRef.close(updatedContact);
        },
        error: (error) => {
          this.isLoading = false; 
          console.error('Error updating contact:', error);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
