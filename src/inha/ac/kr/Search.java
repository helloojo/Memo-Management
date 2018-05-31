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
		String sql = "Select boardid,boardname,memoid,title,content,bgcolor from board inner join memos using(boardid) where binary title like ? || binary content like ?";
		//대소문자 구별(binary)해서 검색결과 가져오기 위한 query
		try {
			while (conn == null) {
				conn = DBconn.getConnection();
			}
			pst = conn.prepareStatement(sql);
			pst.setString(1, "%" + query + "%");		//query에 data 입력
			pst.setString(2, "%" + query + "%");
			ResultSet rs = pst.executeQuery();			//Search query 실행
			result.append("[");						//Search 결과 JSON 배열로 만들기 위한 초기값
			if (!rs.first()) {						//결과 없을 시 빈 배열로 만든다
				result.append("]");
			}
			rs.beforeFirst();						//ResultSet 처음으로 이동
			ResultSetMetaData rsmeta = rs.getMetaData();	//metadata가져옴
			int count = rsmeta.getColumnCount();			//column의 수
			while (rs.next()) {
				result.append("{");					//JSON형식 시작
				for (int i = 1; i <= count; i++) {
					switch (rsmeta.getColumnType(i)) {	//Column Type에 맞춰서 JSON 입력
					case Types.NUMERIC:
						result.append("\"" + rsmeta.getColumnName(i) + "\": " + rs.getInt(i) + ",");
						break;
					default:
						result.append("\"" + rsmeta.getColumnName(i) + "\": \"" + rs.getString(i) + "\",");
						break;
					}
				}
				result.setCharAt(result.length()-1, '}');	//마지막 ','을 '}'로 변경 -> parseJSON 오류 해결
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
		result.setCharAt(result.length() - 1, ']');		//마지막 ','을 ']'로 변경 -> parseJSON 오류 해결
		return result.toString();						//JSON 반환
	}
}
