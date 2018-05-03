package inha.ac.kr;

import java.sql.*;

public class Memo {
	public static String getMemo(String boardid) {
		Connection conn;
		Statement st;
		String str = null;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Select * from memos where boardid=" + boardid;
			ResultSet rs = st.executeQuery(sql);
			str = "[";
			if(!rs.first()) {
				str+="]";
			}
			rs.beforeFirst();
			while (rs.next()) {
				int r_mID = rs.getInt("memoid");
				int r_bID = rs.getInt("boardid");
				String r_title = rs.getString("title");
				String r_content = rs.getString("content");
				String r_time = rs.getString("time");
				String r_color = rs.getString("bgcolor");
				int r_imgid = rs.getInt("imageid");
				boolean r_imp = rs.getBoolean("important");
				int r_x = rs.getInt("x");
				int r_y = rs.getInt("y");
				str += "{" + "\"mid\": " + r_mID + "," + "\"bid\": " + r_bID + "," + "\"title\": \"" + r_title + "\","
						+ "\"content\": \"" + r_content + "\"," + "\"time\": \"" + r_time + "\"," + "\"bgcolor\": \""
						+ r_color + "\"," + "\"important\": " + r_imp + "," + "\"imgid\": " + r_imgid + ",\"x\": " + r_x
						+ ",\"y\": " + r_y + "}";
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

	public static void addMemo(String boardid, String title, String content, String time, String bgcolor,
			String imageid, String important, String x, String y) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			if(imageid=="") {
				imageid="null";
			}
			String sql = "Insert into memos(boardid,title,content,time,bgcolor,imageid,important,x,y) values(" + boardid
					+ ",\'" + title + "\',\'" + content + "\',\'" + time + "\',\'" + bgcolor + "\'," + imageid + "," + important + ","
					+ x + "," + y + ")";
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoTitle(String memoid, String title) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set title=" + title + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoContent(String memoid, String content) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set content=" + content + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoTime(String memoid, String time) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set time=" + time + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoColor(String memoid, String bgcolor) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set bgcolor=" + bgcolor + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoCoordinate(String memoid, String x, String y) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set x=" + x + ", y=" + y + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoImportant(String memoid, String important) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set important=" + important + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateMemoImage(String memoid, String imageid) {
		Connection conn;
		Statement st;
		try {
			conn = DBconn.getConnection();
			st = conn.createStatement();
			String sql = "Update memos set imageid=" + imageid + " where memoid=" + memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void deleteMemo(String memoid) {
		Connection conn;
		Statement st;
		try {
			conn=DBconn.getConnection();
			st=conn.createStatement();
			String sql="Delete from memos where memoid="+memoid;
			st.executeUpdate(sql);
			DBconn.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
