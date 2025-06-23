export const getAllMembersQuery = "SELECT * FROM members";
export const signUpQuery =
  "INSERT INTO members (member_name, email,password,role) VALUES (?, ?, ?, ?)";
export const forgotPasswordQuery = `UPDATE members SET resetPassword = ?, resetPasswordExpiresAt = ?, WHERE id = ?`;
export const resetPasswordQuery = `UPDATE members SET password = ?, resetPassword = ? ,resetPasswordExpiresAt = ? WHERE id = ? `;
