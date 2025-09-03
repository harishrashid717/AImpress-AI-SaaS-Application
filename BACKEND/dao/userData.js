import db from "../config/dbConnection.js";

export const userCreation = async (userId) => {
  try {
    const sql = `
      SELECT id, user_id, prompt, content, type, publish, likes, created_at, updated_at
      FROM creations
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    const [rows] = await db.query(sql, [userId]);
    return rows.map((row) => ({
      ...row,
      likes: (() => {
        if (!row.likes) return []; // null → []
        if (typeof row.likes === "string") {
          try {
            return JSON.parse(row.likes); // string → parse
          } catch (e) {
            return [];
          }
        }
        if (Array.isArray(row.likes)) return row.likes; // already array
        return [];
      })(),
    }));
  } catch (error) {
    const err = new Error("Failed to fetch user creations");
    err.statusCode = 500;
    throw err;
  }
};



export const getPublishedCreations = async () => {
  try {
    const sql =
      "SELECT * FROM creations WHERE publish = ? ORDER BY created_at DESC";
    const [rows] = await db.query(sql, [1]);
    return rows.length > 0 ? rows : [];
  } catch (error) {
    throw error;
  }
};


// model/userDataModel.js
// export const getLikes = async (contentId) => {
//   try {
//     const sql = "SELECT likes FROM creations WHERE id = ?";
//     const [rows] = await db.query(sql, [contentId]);
//     console.log("likes in the db", rows);

//     if (rows.length === 0) {
//       const error = new Error("Creation not found");
//       error.statusCode = 400;
//       throw error;
//     }

//     const rawLikes = rows[0].likes;
//     console.log("raw likes", rawLikes);

//     if (!rawLikes) return [];

//     try {
//       const parsed = JSON.parse(rawLikes);
//       // ✅ Ensure it's always a flat string array
//       return Array.isArray(parsed)
//         ? parsed.flat().filter((x) => typeof x === "string")
//         : [];
//     } catch {
//       // Fallback: was stored as a plain string
//       return [rawLikes];
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateLikes = async (id, likesArr) => {
//   try {
//     const sql = "UPDATE creations SET likes = ? WHERE id = ?";
//     // ✅ Ensure clean JSON before storing
//     const cleanArr = [...new Set(likesArr.flat().filter((x) => typeof x === "string"))];
//     const [result] = await db.query(sql, [JSON.stringify(cleanArr), id]);
//     return result.affectedRows > 0 ? result.affectedRows : null;
//   } catch (error) {
//     throw error;
//   }
// };

export const updateLikes = async(id, likesArr) =>{
  try{
    const sql = 'UPDATE creations SET likes = ? WHERE id = ?';
    const [result] = await db.query(sql, [likesArr, id]);
     return result.affectedRows > 0 ? result.affectedRows : null;
  }catch(error){
    throw error;
  }
}

export const getLikes = async (id) => {
  try {
    const sql = 'SELECT likes FROM creations WHERE id = ?';
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      const error = new Error("Creation not found");
      error.statusCode = 400;
      throw error;
    }

    const rawLikes = rows[0].likes;

    if (rawLikes === null) {
      return "[]"; 
    }

    return typeof rawLikes === "string"
      ? rawLikes
      : JSON.stringify(rawLikes);

  } catch (error) {
    throw error;
  }
};

