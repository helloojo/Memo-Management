package inha.ac.kr;

import java.sql.*;
import javax.naming.NamingException;
/**
 * 
 * @author AYJ
 * Javascript에서 ajax를 이용해 Board관련 Data 요청했을때
 * DB에서 Board Data처리위한 Class
 * 모든 함수는 Static선언해서 바로 사용할 수 있게함
 *
 */
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
			ResultSet rs = st.executeQuery(sql);		//sql query 실행
			str.append("[");							//json 배열로 만들기 위한 초기값설정
			if (!rs.first()) {							//query 결과가 없을때 빈 배열로 설정
				str.append("]");
			}
			rs.beforeFirst();							//resultset 첫번째 결과로 돌아옴
			ResultSetMetaData rsmeta = rs.getMetaData();//metadata 받음
			int count = rsmeta.getColumnCount();		//column 개수 받음
			while (rs.next()) {
				str.append("{");						//JSON 형식 시작
				for (int i = 1; i <= count; i++) {
					switch (rsmeta.getColumnType(i)) {	//Type에 따른 결과값 처리
					case Types.NUMERIC:
						str.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getInt(i) + ",");
						break;
					default:
						str.append("\"" + rsmeta.getColumnName(i) + "\": \"" + rs.getString(i) + "\",");
						break;
					}
				}
				str.setCharAt(str.length()-1, '}');	//마지막 ',' 문자를 '}'로 변환 -> 안할시 parseJSON에러
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
		str.setCharAt(str.length() - 1, ']');	//마지막 ',' 문자를 ']'로 변환
		return str.toString();					//query 결과 JSON배열 형식 반환
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
			pst.executeUpdate();		//카테고리 추가
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
			pst.executeUpdate();		//카테고리 업데이트
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
			pst.executeUpdate();		//카테고리 삭제
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
