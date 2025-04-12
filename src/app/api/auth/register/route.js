import { sql, poolPromise } from '@/config/db'

export async function POST(request) {
  try {
    const { username, password } = await request.json()
    const pool = await poolPromise

    // Check if username already exists
    const checkUser = await pool.request()
      .input('username', sql.NVarChar(100), username)
      .query('SELECT * FROM [user] WHERE username = @username')
    
    if (checkUser.recordset.length > 0) {
      return Response.json({ success: false, message: 'Tên đăng nhập đã tồn tại' })
    }

    // Create new user
    const result = await pool.request()
      .input('username', sql.NVarChar(100), username)
      .input('password', sql.NVarChar(100), password)
      .query('INSERT INTO [user] (username, password) VALUES (@username, @password)')
    
    return Response.json({ success: true, message: 'Đăng ký thành công' })
  } catch (error) {
    return Response.json({ success: false, message: error.message })
  }
}
