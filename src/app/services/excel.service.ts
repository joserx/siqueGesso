import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(
    reportHeading: string,
    reportSubHeading: string,
    headersArray: any[],
    json: any[],
    footerData: any,
    excelFileName: string,
    sheetName: string
  ){
    const header = headersArray
    const data = json

    const workbook = new Workbook()
    workbook.creator = "Guilherme Espim"
    workbook.lastModifiedBy = "Guilherme Espim"
    workbook.created = new Date()
    workbook.modified = new Date()
    const worksheet = workbook.addWorksheet(sheetName)

    worksheet.addRow([])
    worksheet.getCell('A1').value = reportHeading
    worksheet.getCell('A1').alignment = { horizontal: 'center' }
    worksheet.getCell('A1').font = { size: 15, bold: true}

    if(reportSubHeading !== ''){
      worksheet.addRow([])
      worksheet.getCell('A2').value = reportSubHeading
      worksheet.getCell('A2').alignment = { horizontal: 'center' }
      worksheet.getCell('A2').font = { size: 15, bold: false}
    }

    worksheet.addRow([])

    const headerRow = worksheet.addRow(header)
    headerRow.eachCell((cell:any, index)=>{
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { arbg: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin'}, left: { style: 'thin'}, right: { style: 'thin'}, bottom: { style: 'thin'} }
      cell.font = { size: 12, bold: true }

      worksheet.getColumn(index).width = header[index - 1].length < 20? 20:header[index - 1].legth;
    })

    let columnsArray: any[]
    for( const key in json){
      if(json.hasOwnProperty(key)){
        columnsArray = Object.keys(json[key])
      }
    }

    data.forEach((element:any) => {
      const eachRow: any = []
      columnsArray.forEach((column)=>{
        eachRow.push(element[column])
      })

      if(element.isDeleted === 'Y'){
        const deletedRow = worksheet.addRow(eachRow)
        deletedRow.eachCell((cell)=>{
          cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true }
        })
      }else{
        worksheet.addRow(eachRow)
      }
    });
    
    worksheet.addRow([])

  }
}
