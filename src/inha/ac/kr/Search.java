package inha.ac.kr;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.NamingException;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Search {
	public static String getResult(String query) {
		Connection conn = null;
		PreparedStatement pst;
		String result = "";
		String sql = "Select boardid,boardname,memoid,title,content,bgcolor from board inner join memos using(boardid) where title like ? || content like ?";
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			pst = conn.prepareStatement(sql);
			pst.setString(1, "%"+query+"%");
			pst.setString(2, "%"+query+"%");
			ResultSet rs = pst.executeQuery();
			result = "[";
			if (!rs.first()) {
				result += "]";
			}
			rs.beforeFirst();
			while (rs.next()) {
				int r_mID = rs.getInt("memoid");
				int r_bID = rs.getInt("boardid");
				String r_boardname = rs.getString("boardname");
				String r_title = rs.getString("title");
				String r_content = rs.getString("content");
				String r_color = rs.getString("bgcolor");
				result += "{" + "\"mid\": " + r_mID + ",\"bid\": " + r_bID + ",\"boardname\": \"" + r_boardname
						+ "\",\"title\": \"" + r_title + "\",\"content\": \"" + r_content + "\",\"bgcolor\": \""
						+ r_color + "\"}";
				result += ",";
			}
			rs.close();
			pst.close();
			conn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		}
		StringBuilder json = new StringBuilder(result);
		json.setCharAt(result.length() - 1, ']');
		result = json.toString();
		return result;
	}
}
