package inha.ac.kr;

import java.sql.*;
import javax.naming.NamingException;

public class Board {
	public static String getBoard() {
		Connection conn = null;
		Statement st;
		StringBuffer str = new StringBuffer("");
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			st = conn.createStatement();
			String sql = "Select * from board";
			ResultSet rs = st.executeQuery(sql);
			str.append("[");
			if (!rs.first()) {
				str.append("]");
			}
			rs.beforeFirst();
			ResultSetMetaData rsmeta = rs.getMetaData();
			int count = rsmeta.getColumnCount();
			while (rs.next()) {
				str.append("{");
				for (int i = 1; i <= count; i++) {
					switch (rsmeta.getColumnType(i)) {
					case Types.NUMERIC:
						str.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getInt(i) + ",");
						break;
					default:
						str.append("\"" + rsmeta.getColumnName(i) + "\": \"" + rs.getString(i) + "\",");
						break;
					}
				}
				str.setCharAt(str.length()-1, '}');
				str.append(",");
			}
			rs.close();
			st.close();
			conn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		}
		str.setCharAt(str.length() - 1, ']');
		return str.toString();
	}

	public static void addBoard(String boardname) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Insert into board(boardname) values(?)";
			pst = conn.prepareStatement(sql);
			pst.setString(1, boardname);
			pst.executeUpdate();
			pst.close();
			conn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}

	public static void updateBoard(String boardid, String boardname) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update board set boardname=? where boardid=?";
			pst = conn.prepareStatement(sql);
			pst.setString(1, boardname);
			pst.setInt(2, Integer.parseInt(boardid));
			pst.executeUpdate();
			pst.close();
			conn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}

	public static void deleteBoard(String boardid) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Delete from board where boardid=?";
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(boardid));
			pst.executeUpdate();
			pst.close();
			conn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}
}
