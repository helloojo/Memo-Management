package inha.ac.kr;

import java.sql.*;
import javax.sql.DataSource;
import javax.naming.*;

/**
 * 
 * @author AYJ
 * Connection Pool에서 DB Connection 가져오는 class
 * 함수, 변수 static 처리
 *
 */

public class DBconn {
	private static Connection conn;
	public static Connection getConnection() throws ClassNotFoundException, SQLException, NamingException {
		Context ctx = new InitialContext();
		DataSource ds = (DataSource) ctx.lookup("java:/comp/env/jdbc/memo");
		conn = ds.getConnection();		//Connection Pool에서 connection 가져옴
		return conn;
	}
}