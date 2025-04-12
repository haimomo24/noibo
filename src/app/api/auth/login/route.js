import { sql, poolPromise } from '@/config/db'

export async function POST(request) {
  try {
    const { username, password } = await request.json()
    const pool = await poolPromise
    const result = await pool.request()
      .input('username', sql.NVarChar(100), username)
      .input('password', sql.NVarChar(100), password)
      .query('SELECT * FROM [user] WHERE username = @username AND password = @password')
    
    if (result.recordset.length > 0) {
      return Response.json({ success: true, user: result.recordset[0] })
    } else {
      return Response.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    return Response.json({ success: false, message: error.message })
  }
}
