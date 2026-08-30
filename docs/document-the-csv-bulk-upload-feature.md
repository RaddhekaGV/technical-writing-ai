---
title: Document the CSV Bulk Upload feature
sidebar_label: Document the CSV Bulk Upload feature
---

# CSV Bulk Upload

The CSV Bulk Upload feature allows you to create multiple records at once by uploading a CSV file. This is ideal when you need to import dozens or hundreds of records quickly, saving you time compared to entering them individually through the interface.

## How to Use Bulk Upload

Follow these steps to upload your records via CSV:

1. Navigate to **Import > Bulk Upload** in the main menu
2. Click the **Choose File** button to select your CSV file from your computer
3. Review the file preview to ensure your data is formatted correctly
4. Click **Upload** to begin the import process
5. Wait for the upload to complete—you'll see a success message with the number of records created
6. If any rows had errors, download the error report to see which records were skipped and why

## CSV File Requirements

Your CSV file must meet the following requirements:

- **Required columns:** Name, Email, Role (in that exact order)
- **File format:** Standard CSV format with comma-separated values
- **Maximum file size:** 5MB
- **Header row:** Include a header row with the column names
- **Encoding:** UTF-8 encoding recommended

### Example CSV Format

```
Name,Email,Role
John Smith,john.smith@example.com,Admin
Jane Doe,jane.doe@example.com,Editor
Bob Johnson,bob.johnson@example.com,Viewer
```

## Availability

The CSV Bulk Upload feature is available on **Pro and Enterprise plans only**. If you don't see this option in your account, please check your current plan or contact your account administrator.

## Troubleshooting

**Invalid rows are skipped during upload**  
If some rows in your CSV contain invalid data (such as improperly formatted email addresses or missing required fields), those rows will be skipped. The valid rows will still be imported successfully. After upload, download the error report to see exactly which rows failed and the reason for each failure.

**File size exceeds limit**  
If your CSV file is larger than 5MB, consider splitting it into multiple smaller files and uploading them separately.

**Upload appears to hang**  
Large files may take several minutes to process. Please wait for the process to complete before navigating away from the page.