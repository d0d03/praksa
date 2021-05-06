package com.dodo.punchin.config;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.dodo.punchin.entities.Workday;

public class ExcelHelper {

	public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	static String[] HEADERs = {"Id", "Date", "Start", "End", "Hours", "Note"};
	static String SHEET = "Workdays";
	
	public static ByteArrayInputStream workdaysToExcel(List<Workday> workdays) {
		try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();){
			Sheet sheet = workbook.createSheet(SHEET);
			
			Row headerRow = sheet.createRow(0);
			
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}
			
			int rowIdx = 1;
			for(Workday workday : workdays) {
				Row row = sheet.createRow(rowIdx++);
				
				row.createCell(0).setCellValue((workday.getId()));
				row.createCell(1).setCellValue((workday.getDate().toString()));
				row.createCell(2).setCellValue((workday.getStart().toString()));
				row.createCell(3).setCellValue((workday.getEnd().toString()));
				row.createCell(4).setCellValue((workday.getHours().toString()));
				row.createCell(5).setCellValue((workday.getNote()));
			}
			
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
			
		}catch (IOException e) {
			throw new RuntimeException("failed");
		}
	}
}
