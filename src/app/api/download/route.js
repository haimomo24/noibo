import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let filePath = searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy đường dẫn file' },
        { status: 400 }
      );
    }
    
    // Loại bỏ dấu / ở đầu nếu có
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1);
    }
    
    // Đảm bảo đường dẫn file an toàn (tránh path traversal attack)
    const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
    
    // Thử các vị trí khác nhau để tìm file
    const possiblePaths = [
      path.join(process.cwd(), 'public', safePath),
      path.join(process.cwd(), safePath),
      path.join(process.cwd(), 'uploads', path.basename(safePath))
    ];
    
    let fullPath = null;
    
    // Kiểm tra từng đường dẫn có thể
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        fullPath = testPath;
        break;
      }
    }
    
    // Nếu không tìm thấy file
    if (!fullPath) {
      console.error('File not found. Tried paths:', possiblePaths);
      return NextResponse.json(
        { success: false, message: 'File không tồn tại' },
        { status: 404 }
      );
    }
    
    // Đọc file
    const fileBuffer = fs.readFileSync(fullPath);
    
    // Xác định loại MIME dựa trên phần mở rộng của file
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream'; // Mặc định
    
    // Ánh xạ các loại file phổ biến
    const mimeTypes = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.txt': 'text/plain',
      '.zip': 'application/zip',
      '.exe': 'application/octet-stream',
    };
    
    if (mimeTypes[ext]) {
      contentType = mimeTypes[ext];
    }
    
    // Tạo response với file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(path.basename(fullPath))}"`,
      },
    });
    
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tải file: ' + error.message },
      { status: 500 }
    );
  }
}
