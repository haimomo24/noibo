import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request) {
  try {
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
      return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Tạo tên file ngẫu nhiên để tránh trùng lặp
    const filename = `${Date.now()}-${file.name}`
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

    // Lưu file vào thư mục public/uploads
    await writeFile(filepath, buffer)

    return NextResponse.json({ 
      success: true,
      filePath: `/uploads/${filename}`
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}
