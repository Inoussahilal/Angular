// app.component.ts
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  bookObj: Book = new Book();
  bookList: Book[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData != null) {
      this.bookList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = this.modal?.nativeElement;
    if (model) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.bookObj = new Book();
    const model = this.modal?.nativeElement;
    if (model) {
      model.style.display = 'none';
    }
  }

  onDelete(item: Book) {
    const isDelete = confirm("Voulez-vous vraiment supprimer ?");
    if (isDelete) {
      const currentRecord = this.bookList.findIndex(m => m.id === item.id);
      if (currentRecord !== -1) {
        this.bookList.splice(currentRecord, 1);
        localStorage.setItem('angular17crud', JSON.stringify(this.bookList));
      }
    }
  }

  onEdit(item: Book) {
    this.bookObj = { ...item };
    this.openModel();
  }

  updateBook() {
    const currentRecord = this.bookList.find(m => m.id === this.bookObj.id);
    if (currentRecord !== undefined) {
      currentRecord.title = this.bookObj.title;
      currentRecord.author = this.bookObj.author;
      currentRecord.year = this.bookObj.year;
      currentRecord.description = this.bookObj.description;
      localStorage.setItem('angular17crud', JSON.stringify(this.bookList));
      this.closeModel();
    }
  }

  saveBook() {
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.bookObj.id = oldArray.length + 1;
      oldArray.push(this.bookObj);
      this.bookList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArr = [this.bookObj];
      this.bookObj.id = 1;
      this.bookList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel();
  }
}

class Book {
  id: number;
  title: string;
  author: string;
  year: string;
  description: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.author = '';
    this.year = '';
    this.description = '';
  }
}
