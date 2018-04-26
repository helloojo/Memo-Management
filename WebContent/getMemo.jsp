<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="inha.ac.kr.Memo" %>
<%@ page import="inha.ac.kr.DBconn" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
	String boardid=request.getParameter("boardid");
	Connection conn=DBconn.getConnection();
	Statement st=conn.createStatement();
	String sql="Select * from memos where boardid="+boardid;
	ResultSet rs=st.executeQuery(sql);
	String str="[";
	while(rs.next()) {
		int r_mID=rs.getInt("memoid");
		int r_bID=rs.getInt("boardid");
		String r_title=rs.getString("title");
		String r_content=rs.getString("content");
		String r_time=rs.getString("time");
		String r_color=rs.getString("bgcolor");
		int r_imgid=rs.getInt("imageid");
		boolean r_imp=rs.getBoolean("important");
		str+=Memo.getData(r_title,r_content,r_time,r_color,r_imp,r_bID,r_mID,r_imgid);
		str+=",";
	}
	StringBuilder json=new StringBuilder(str);
	json.setCharAt(str.length()-1, ']');
	System.out.println(json);
%><%=json%>