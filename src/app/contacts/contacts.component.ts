import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsService } from './contacts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Contact } from './contacts.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})

export class ContactsComponent implements OnInit {
  dataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'email', 'relation', 'actions'];
  isLoading = true; 
  isFiltering = false;
  selection = new SelectionModel<Contact>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public contactsService: ContactsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Contact>([]); 
    this.loadContacts(); 
  }

  initSaveContact(contact?: Contact): void {
    const contactData = contact || Contact.createEmpty();
    const dialogRef = this.dialog.open(FormComponent, {
      data: { action: 'add', contact: contactData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addContactToTable(result);
      }
    });
  }
  addContactToTable(newContact: Contact): void {
    const currentData = this.dataSource.data;
    currentData.push(newContact);
    this.dataSource.data = currentData; 
  }

  loadContacts() {
    this.contactsService.getAll().subscribe((data: Contact[]) => {
      this.dataSource = new MatTableDataSource<Contact>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  editContact(contact: Contact) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { action: 'edit', contact: contact },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateContactInTable(result);
      }
    });
  }
  
  updateContactInTable(updatedContact: Contact): void {
    const index = this.dataSource.data.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.dataSource.data[index] = updatedContact;
      this.dataSource.data = [...this.dataSource.data]; 
    }
  }

  deleteContact(contact: Contact) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: contact
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.removeContactFromTable(contact);
      }
    });
  }

  removeContactFromTable(contactToDelete: Contact): void {
    const index = this.dataSource.data.findIndex(c => c.id === contactToDelete.id);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data]; 
    }
  }

  addNew() {
    this.initSaveContact();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.isFiltering = filterValue ? true : false;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}
