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
			String sql = "Select * from memos";		//모든 memo를 가져오기 위한 query
			ResultSet rs = st.executeQuery(sql);	//query 실행
			str.append("[");						//JSON 배열 만들기 위한 초기값
			if (!rs.first()) {
				str.append("]");					//memo 없을때 빈 배열로 만들기 위함
			}
			rs.beforeFirst();						//ResultSet의 첫번째 결과로 초기화
			ResultSetMetaData rsmeta = rs.getMetaData();	//metadata 가져옴
			int count = rsmeta.getColumnCount();			//column 수
			while (rs.next()) {
				str.append("{");					//JSON 형식 시작
				for (int i = 1; i <= count; i++) {
					switch (rsmeta.getColumnType(i)) {	//Type에 맞는 Data처리
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
				str.setCharAt(str.length()-1, '}');	//마지막 ','을 '}'로 바꿈 -> parseJSON 해결
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
		str.setCharAt(str.length() - 1, ']');	//마지막 ','을 ']'로 바꿈
		return str.toString();					//query 결과값 반환
	}

	public static String getMemo(String boardid) {
		Connection conn = null;
		PreparedStatement pst;
		StringBuffer str = new StringBuffer("");
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			String sql = "Select * from memos where boardid=?";		//boardid에 맞는 메모 가져오기위한 query
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(boardid));
			ResultSet rs = pst.executeQuery();	//query 실행
			str.append("[");			//JSON 배열 만들기 위한 초기값
			if (!rs.first()) {
				str.append("]");		//query 결과 없을 때 빈 배열로 만듬
			}
			rs.beforeFirst();
			ResultSetMetaData rsmeta = rs.getMetaData();		//metadata 가져옴
			int count = rsmeta.getColumnCount();				//column 수
			while (rs.next()) {
				str.append("{");		//JSON 시작
				for (int i = 1; i <= count; i++) {
					switch (rsmeta.getColumnType(i)) {		//type에 맞게 Data처리
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
				str.setCharAt(str.length()-1, '}');		//마지막 ','을 '}'로 바꿈 -> parseJSON 해결
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
		str.setCharAt(str.length() - 1, ']');		//마지막 ','을 ']'로 바꿈
		return str.toString();						//query 결과값 반환
	}

	public static void addMemo(String boardid, String title, String content, String time, String bgcolor,
			String imagepath, String important, String x, String y) {
		Connection conn = null;
		PreparedStatement pst;
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			if (imagepath == "") {		//imagepath값 null로 변경
				imagepath = "null";
			}
			String sql = "Insert into memos values(null,?,?,?,?,?,?,?,?,?)";		//preparedstatement처리 위한 query
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(boardid));		//query에 값 입력
			pst.setString(2, title);
			pst.setString(3, content);
			pst.setString(4, time);
			pst.setString(5, bgcolor);
			pst.setString(6, imagepath);
			pst.setBoolean(7, Boolean.parseBoolean(important));
			pst.setDouble(8, Double.parseDouble(x));
			pst.setDouble(9, Double.parseDouble(y));
			pst.executeUpdate();						//메모 추가
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
			String sql = "Update memos set title=?, time=? where memoid=?";		//memo title update위한 query
			pst = conn.prepareStatement(sql);
			pst.setString(1, title);			//query에 값 입력
			pst.setString(2, time);
			pst.setInt(3, Integer.parseInt(memoid));
			pst.executeUpdate();				//memo update
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
			String sql = "Update memos set content=?, time=? where memoid=?";	//memo content updata위한 query
			pst = conn.prepareStatement(sql);
			pst.setString(1, content);		//query에 값 입력
			pst.setString(2, time);
			pst.setInt(3, Integer.parseInt(memoid));
			pst.executeUpdate();			//memo update
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
			String sql = "Update memos set bgcolor=? where memoid=?";	//memo color updata 위한 query
			pst = conn.prepareStatement(sql);
			pst.setString(1, bgcolor);			//query에 값 입력
			pst.setInt(2, Integer.parseInt(memoid));
			pst.executeUpdate();		//memo update
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
			String sql = "Update memos set x=?, y=? where memoid=?";		//memo 좌표 update위한 query
			pst = conn.prepareStatement(sql);
			pst.setDouble(1, Double.parseDouble(x));		//query에 값 입력
			pst.setDouble(2, Double.parseDouble(y));
			pst.setInt(3, Integer.parseInt(memoid));
			pst.executeUpdate();							//memo update
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
			String sql = "Update memos set important=? where memoid=?";		//memo 중요도 update 위한 query
			pst = conn.prepareStatement(sql);
			pst.setBoolean(1, Boolean.parseBoolean(important));		//query에 값 입력
			pst.setInt(2, Integer.parseInt(memoid));
			pst.executeUpdate();		//memo update
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
			String sql = "Update memos set imagepath=?, time=? where memoid=?";		//memo imagepath update 위한 query
			pst = conn.prepareStatement(sql);
			pst.setString(1, imagepath);		//query에 값 입력
			pst.setString(2, time);
			pst.setInt(3, Integer.parseInt(memoid));
			pst.executeUpdate();		//memo update
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
			String sql = "Delete from memos where memoid=?";		//memo 삭제위한 query
			pst = conn.prepareStatement(sql);
			pst.setInt(1, Integer.parseInt(memoid));		//query에 값 입력
			pst.executeUpdate();		//memo delete
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
