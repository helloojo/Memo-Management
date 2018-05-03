package inha.ac.kr;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Board {
	public static String getBoard() {
		Connection conn;
		Statement st;
		String str = null;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Select * from board";
			ResultSet rs = st.executeQuery(sql);
			str = "[";	
			if(!rs.first()) {
				str+="]";
			}
			rs.beforeFirst();
			while (rs.next()) {
				int r_bID = rs.getInt("boardid");
				String r_bname=rs.getString("boardname");
				String r_boardbgcolor=rs.getString("boardbgcolor");
				str+= "{"+
				"\"id\": \""+r_bID+"\","+
				"\"name\": \""+r_bname+"\","+
				"\"color\": \""+r_boardbgcolor+"\"}";
				str += ",";
			}
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		StringBuilder json = new StringBuilder(str);
		json.setCharAt(str.length() - 1, ']');
		str=json.toString();
		return str;
	}
	public static void addBoard(String boardname, String boardbgcolor) {
		Connection conn;
		Statement st;
		try {
			conn=DBconn.getConnection();
			st=conn.createStatement();
			String sql="Insert into board(boardname,boardbgcolor) values(\'"+boardname+"\',\'"+boardbgcolor+"\')";
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public static void deleteBoard(String boardid) {
		Connection conn;
		Statement st;
		try {
			conn=DBconn.getConnection();
			st=conn.createStatement();
			String sql="Delete from board where boardid="+boardid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
