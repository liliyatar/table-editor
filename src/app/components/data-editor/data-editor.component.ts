import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.css']
})
export class DataEditorComponent {
  allData: string = '';

  constructor(
    public dataService: DataService,
  ) {}

  loadJSON() {
    this.dataService.loadJSON(this.allData);
  }

  unloadJSON() {
    this.allData = this.dataService.unloadJSON();
  }

  loadCSV() {
    this.dataService.loadCSV(this.allData);
  }

  unloadCSV() {
    this.allData = this.dataService.unloadCSV();
  }
  
  downloadCSV() {
    this.dataService.downloadCSV();
  }

  downloadJSON(data: string) {
    this.dataService.downloadJSON(data);
  }

  loadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        this.allData = fileData;
      };
      reader.readAsText(file);
    }
  }

  addRow() {
    this.dataService.addRow();
  }

  deleteRow(index: number) {
    this.dataService.deleteRow(index);
  }

  moveUp(index: number) {
    this.dataService.moveUp(index);
  }

  moveDown(index: number) {
    this.dataService.moveDown(index);
  }
}
