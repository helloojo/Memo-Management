package inha.ac.kr;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.NamingException;

public class Board {
	public static String getBoard() {
		Connection conn = null;
		Statement st;
		String str = "";
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			st = conn.createStatement();
			String sql = "Select * from board";
			ResultSet rs = st.executeQuery(sql);
			str = "[";
			if (!rs.first()) {
				str += "]";
			}
			rs.beforeFirst();
			while (rs.next()) {
				int r_bID = rs.getInt("boardid");
				String r_bname = rs.getString("boardname");
				str += "{" + "\"id\": \"" + r_bID + "\"," + "\"name\": \"" + r_bname + "\"}";
				str += ",";
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
		StringBuilder json = new StringBuilder(str);
		json.setCharAt(str.length() - 1, ']');
		str = json.toString();
		return str;
	}

	public static void addBoard(String boardname) {
		Connection conn = null;
		Statement st;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			st = conn.createStatement();
			String sql = "Insert into board(boardname) values(\'" + boardname + "\')";
			st.executeUpdate(sql);
			st.close();
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
		Statement st;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			st = conn.createStatement();
			String sql = "Update board set boardname=\'" + boardname + "\'where boardid=" + boardid;
			st.executeUpdate(sql);
			st.close();
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
		Statement st;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			st = conn.createStatement();
			String sql = "Delete from board where boardid=" + boardid;
			st.executeUpdate(sql);
			st.close();
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
