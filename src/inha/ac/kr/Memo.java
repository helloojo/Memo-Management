package inha.ac.kr;

import java.sql.*;

import javax.naming.NamingException;

public class Memo {
	public static String getAllMemo() {
		Connection conn = null;
		Statement st;
		StringBuffer str = new StringBuffer("");
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			st = conn.createStatement();
			String sql = "Select * from memos";
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
					case Types.DOUBLE:
						str.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getDouble(i) + ",");
						break;
					case Types.BOOLEAN:
						str.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getBoolean(i) + ",");
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

	public static String getMemo(String boardid) {
		Connection conn = null;
		PreparedStatement pst;
		StringBuffer str = new StringBuffer("");
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Select * from memos where boardid=?";
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(boardid));
			ResultSet rs = pst.executeQuery();
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
					case Types.DOUBLE:
						str.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getDouble(i) + ",");
						break;
					case Types.BOOLEAN:
						str.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getBoolean(i) + ",");
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
			pst.close();
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

	public static void addMemo(String boardid, String title, String content, String time, String bgcolor,
			String imagepath, String important, String x, String y) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			if (imagepath == "") {
				imagepath = "null";
			}
			String sql = "Insert into memos values(null,?,?,?,?,?,?,?,?,?)";
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(boardid));
			pst.setString(2, title);
			pst.setString(3, content);
			pst.setString(4, time);
			pst.setString(5, bgcolor);
			pst.setString(6, imagepath);
			pst.setBoolean(7, Boolean.parseBoolean(important));
			pst.setDouble(8, Double.parseDouble(x));
			pst.setDouble(9, Double.parseDouble(y));
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

	public static void updateMemoTitle(String memoid, String title, String time) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update memos set title=?, time=? where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setString(1, title);
			pst.setString(2, time);
			pst.setInt(3, Integer.parseInt(memoid));
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

	public static void updateMemoContent(String memoid, String content, String time) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update memos set content=?, time=? where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setString(1, content);
			pst.setString(2, time);
			pst.setInt(3, Integer.parseInt(memoid));
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

	public static void updateMemoColor(String memoid, String bgcolor) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update memos set bgcolor=? where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setString(1, bgcolor);
			pst.setInt(2, Integer.parseInt(memoid));
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

	public static void updateMemoCoordinate(String memoid, String x, String y) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update memos set x=?, y=? where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setDouble(1, Double.parseDouble(x));
			pst.setDouble(2, Double.parseDouble(y));
			pst.setInt(3, Integer.parseInt(memoid));
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

	public static void updateMemoImportant(String memoid, String important) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update memos set important=? where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setBoolean(1, Boolean.parseBoolean(important));
			pst.setInt(2, Integer.parseInt(memoid));
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

	public static void updateMemoImage(String memoid, String time, String imagepath) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Update memos set imagepath=?, time=? where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setString(1, imagepath);
			pst.setString(2, time);
			pst.setInt(3, Integer.parseInt(memoid));
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

	public static void deleteMemo(String memoid) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Delete from memos where memoid=?";
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(memoid));
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
