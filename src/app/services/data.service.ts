import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  allData = '';
  rows: any[] = [];
  columns: string[] = [];

  loadJSON(allData: string) {
    try {
      const data = JSON.parse(allData);
      if (Array.isArray(data) && data.length > 0) {
        this.columns = Object.keys(data[0]);
        this.rows = data;
      } else {
        this.resetData();
      }
    } catch (error) {
      this.resetData();
    }
  }

  loadCSV(csvData: string) {
    try {
      const rows = csvData.trim().split('\n');
      if (rows.length > 1) {
        const header = rows[0].split(',');
        this.columns = header.map((column) => column.trim());
        this.rows = [];
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',');
          const newRow: any = {};
          for (let j = 0; j < header.length; j++) {
            newRow[header[j]] = values[j].trim();
          }
          this.rows.push(newRow);
        }
      } else {
        this.resetData();
      }
    } catch (error) {
      this.resetData();
    }
  }

  unloadJSON() {
    return JSON.stringify(this.rows);
  }

  unloadCSV(): string {
    return this.convertToCSV();
  }

  downloadCSV() {
    const csvData = this.convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  downloadJSON(data: string) {
    const jsonData = data;
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  resetData() {
    this.rows = [];
    this.columns = [];
    this.allData = '';
  }

  loadFileData(fileData: string) {
    this.allData = fileData;
  }

  addRow() {
    const newRow: any = {};
    for (const column of this.columns) {
      newRow[column] = '';
    }
    this.rows.push(newRow);
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }

  moveUp(index: number) {
    if (index > 0) {
      const temp = this.rows[index];
      this.rows[index] = this.rows[index - 1];
      this.rows[index - 1] = temp;
    }
  }

  moveDown(index: number) {
    if (index < this.rows.length - 1) {
      const temp = this.rows[index];
      this.rows[index] = this.rows[index + 1];
      this.rows[index + 1] = temp;
    }
  }

  getRows(): any[] {
    return this.rows;
  }

  getColumns(): string[] {
    return this.columns;
  }

  private convertToCSV() {
    let csv = this.columns.join(',') + '\n';
    for (const row of this.rows) {
      const values = [];
      for (const column of this.columns) {
        values.push(row[column]);
      }
      csv += values.join(',') + '\n';
    }
    return csv;
  }
}
