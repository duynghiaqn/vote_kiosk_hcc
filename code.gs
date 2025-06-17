const SHEET_ID = ''; // Sheet ID

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle("Hệ thống Đánh giá TTPVHCC") // tiêu đề hiển thị trên tab trình duyệt
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // cho phép nhúng iframe nếu cần
}
// Lấy danh sách quầy + nhân viên + ảnh + lĩnh vực + lượt đánh giá hài lòng
function getUnitStaffList() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CONFIG');
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues(); // Lấy cột A (satisfaction), B (unit), C (staffName), D (staffPhoto), E (field)
  return data; // [ [satisfaction, quầy, tên nhân viên, ảnh, lĩnh vực], ... ]
}

// Ghi đánh giá vào sheet DATA
function submitFeedback(unit, staff, rating, comment, ip) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('DATA');
  sheet.appendRow([new Date(), unit, staff, rating, comment, ip]);
}

// Hiển thị thông điệp chạy dưới footer
function getFooterMessage() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CONFIG');
  return sheet.getRange("F2").getValue();
}
