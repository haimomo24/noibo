import { sql, poolPromise } from '@/config/db'
import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const mailId = parseInt(id)
    
    // Kiểm tra xem id có phải là số hợp lệ không
    if (isNaN(mailId)) {
      return NextResponse.json({ 
        success: false, 
        message: 'ID không hợp lệ' 
      }, { status: 400 })
    }
    
    const pool = await poolPromise
    
    // Kiểm tra xem mail có tồn tại không
    const checkResult = await pool.request()
      .input('id', sql.Int, mailId)
      .query('SELECT COUNT(*) as count FROM mail WHERE id = @id')
    
    if (checkResult.recordset[0].count === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Không tìm thấy mail với ID này' 
      }, { status: 404 })
    }
    
    // Thực hiện xóa mail
    const deleteResult = await pool.request()
      .input('id', sql.Int, mailId)
      .query('DELETE FROM mail WHERE id = @id')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Xóa mail thành công' 
    })
  } catch (error) {
    console.error('Error deleting mail:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi xóa mail: ' + error.message 
    }, { status: 500 })
  }
}
