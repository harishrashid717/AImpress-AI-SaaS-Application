import db from "../config/dbConnection.js";
export const contentAdd = async (user_id, prompt, content, type) => {
  try {
    const sql = 'INSERT INTO creations(user_id, prompt, content, type) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [user_id, prompt, content, type]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const imageAdd = async (user_id, prompt, content, type, publish = false) => {
  try {
    const sql = `
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (?, ?, ?, ? , ?)
    `;
    const [result] = await db.query(sql, [user_id, prompt, content, type, publish]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const removeImageBackground = async (user_id, prompt, content, type, publish = false) => {
  try {
    const sql = `
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (?, ?, ?, ? , ?)
    `;
    const [result] = await db.query(sql, [user_id, prompt, content,type, publish]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const removeImageObject = async (user_id, prompt, content, type, publish = false) => {
  try {
    const sql = `
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (?, ?, ?, ? , ?)
    `;
    const [result] = await db.query(sql, [user_id, prompt, content, type, publish]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const resumeReview = async (user_id, prompt, content, type, publish = false) => {
  try {
    const sql = `
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (?, ?, ?, ? , ?)
    `;
    const [result] = await db.query(sql, [user_id, prompt, content, type, publish]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

