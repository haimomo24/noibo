import { sql, poolPromise } from '@/config/db'

export async function POST(request) {
  try {
    const { name, title, description, file_path } = await request.json()
    const pool = await poolPromise
    const result = await pool.request()
      .input('name', sql.NVarChar(100), name)
      .input('title', sql.NVarChar(200), title)
      .input('description', sql.NText, description)
      .input('file_path', sql.NVarChar(500), file_path)
      .query(`
        INSERT INTO mail (name, title, description, file_path)
        VALUES (@name, @title, @description, @file_path)
      `)
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, message: error.message })
  }
}

export async function GET() {
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .query('SELECT * FROM mail ORDER BY created_date DESC')
    
    return Response.json({ success: true, mails: result.recordset })
  } catch (error) {
    return Response.json({ success: false, message: error.message })
  }
}
