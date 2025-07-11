import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Hash password for the user
    const hashedPassword = await bcrypt.hash('Liamribs1', 10)

    // Insert user (using ON CONFLICT to handle duplicates)
    const result = await pool.query(
      `INSERT INTO users (email, name, password_hash) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (email) 
       DO UPDATE SET 
         name = EXCLUDED.name,
         password_hash = EXCLUDED.password_hash,
         updated_at = CURRENT_TIMESTAMP
       RETURNING id, email, name, created_at`,
      ['acalrhys@gmail.com', 'Liam', hashedPassword]
    )

    return Response.json({ 
      message: 'Database setup completed successfully',
      user: result.rows[0]
    })
  } catch (error) {
    console.error('Setup error:', error)
    return Response.json({ 
      error: 'Failed to setup database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}