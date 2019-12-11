import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'Read CSV - Angular';
	filterSearch = "";
	public headerList: any[] = [];			//  initializing for header list
	public recordList: any[] = [];			//  initializing for record list

  	fileUploader($event: any) {
		let files = $event.srcElement.files;
		
		// conversion the csv format to JSON format

		if (this.isValidCSVFile(files[0])) { 
			let input = $event.target;
			let reader = new FileReader();
			reader.readAsText(input.files[0]);

			reader.onload = () => {
				let csvData = reader.result;
				let csvRecordsArray = ( < string > csvData).split(/\r\n|\n/); 
				this.headerList = this.getHeaderArray(csvRecordsArray); 
				this.recordList = this.getDataRecordsArray(csvRecordsArray, this.headerList); 
			};

			reader.onerror = function () {
				console.log('error is occured while reading file!');
			};

		} else {
			alert("Please import valid .csv file.");
			this.fileReset();
		}
	}

	// Method to get the dynamic header for the table from csv first row
	getHeaderArray(csvRecordsArr: any) {
		let headers = ( < string > csvRecordsArr[0]).split(',');
		let headerArray = [];
		for (let j = 0; j < headers.length; j++) {
			if (headers[j].indexOf('"') >= 0) {
				headerArray.push(headers[j].replace(/\"/g, ""));  // checks for double quotes which occurs by default in CSV file and removes it.
			} else {
				headerArray.push(headers[j]);
			}
		}
		return headerArray;
	}

	// Method to get all the records from csv file ,which will be populated in UI

	getDataRecordsArray(csvRecordsArray: any, headerList: any) {
		let csvArr = [];
		for (let i = 1; i < csvRecordsArray.length; i++) {
			csvArr.push({});
			let curruntRecord = ( < string > csvRecordsArray[i]).split(',');
			for (let k = 0; k < headerList.length; k++) {
				if (curruntRecord[k] != "" && curruntRecord[k] != undefined) {
					if (curruntRecord[k].indexOf('"') >= 0) {
						csvArr[i - 1][headerList[k]] = curruntRecord[k].replace(/\"/g, ""); // checks for double quotes which occurs by default in CSV file and removes it.
					} else {
						csvArr[i - 1][headerList[k]] = curruntRecord[k];
					}
				} 
			} 
		}
		return csvArr;
	} 

	// Method to check whether file is valid csv or not

	isValidCSVFile(file: any) {
		return file.name.endsWith(".csv");
	}

	fileReset() {
		//this.csvReader.nativeElement.value = "";  
		this.recordList = [];
	}
}