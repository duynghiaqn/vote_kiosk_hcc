const SHEET_ID = ''; // Sheet ID

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle("Hệ thống Đánh giá TTPVHCC") // tiêu đề hiển thị trên tab trình duyệt
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); //  cho phép nhúng iframe nếu cần
}
// Lấy danh sách quầy + nhân viên + ảnh + lĩnh vực
function getUnitStaffList() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CONFIG');
  const data = sheet.getRange(2, 2, sheet.getLastRow() - 1, 4).getValues();
  return data; // [ [quầy, tên nhân viên, ảnh, lĩnh vực], ... ]
}

// Ghi đánh giá vào sheet DATA
function submitFeedback(unit, staff, rating, comment) {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('DATA');
  sheet.appendRow([new Date(), unit, staff, rating, comment]);
}

// Hiển thị thông điệp chạy dưới footer
function getFooterMessage() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CONFIG');
  return sheet.getRange("F2").getValue();
}
