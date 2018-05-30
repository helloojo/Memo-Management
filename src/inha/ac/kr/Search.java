package inha.ac.kr;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

import javax.naming.NamingException;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class Search {
	public static String getResult(String query) {
		Connection conn = null;
		PreparedStatement pst;
		StringBuffer result = new StringBuffer("");
		String sql = "Select boardid,boardname,memoid,title,content,bgcolor from board inner join memos using(boardid) where title like ? || content like ?";
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			pst = conn.prepareStatement(sql);
			pst.setString(1, "%" + query + "%");
			pst.setString(2, "%" + query + "%");
			ResultSet rs = pst.executeQuery();
			result.append("[");
			if (!rs.first()) {
				result.append("]");
			}
			rs.beforeFirst();
			ResultSetMetaData rsmeta = rs.getMetaData();
			int count = rsmeta.getColumnCount();
			while (rs.next()) {
				result.append("{");
				for (int i = 1; i <= count; i++) {
					switch (rsmeta.getColumnType(i)) {
					case Types.NUMERIC:
						result.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getInt(i) + ",");
						break;
					default:
						result.append("\"" + rsmeta.getColumnName(i) + "\": \"" + rs.getString(i) + "\",");
						break;
					}
				}
				result.setCharAt(result.length()-1, '}');
				result.append(",");
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
		result.setCharAt(result.length() - 1, ']');
		return result.toString();
	}
}
