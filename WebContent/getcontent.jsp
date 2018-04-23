<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="inha.ac.kr.Memo" %>
<%@ page import="inha.ac.kr.Board" %>
<%@ page import="inha.ac.kr.DBconn" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
	String idboard=request.getParameter("idboard");
	Connection conn=DBconn.getConnection();
	Statement st=conn.createStatement();
	String sql="Select * from board where idboard="+idboard;
	ResultSet rs=st.executeQuery(sql);
	if(rs.next()) {
		int r_bID=rs.getInt("idboard");
		String r_bname=rs.getString("boardname");
		int r_memocnt=rs.getInt("memocnt");
		String r_boardbgcolor=rs.getString("boardbgcolor");
		Board b=new Board(r_bID,r_bname,r_memocnt,r_boardbgcolor);
		out.write(b.getData());
	}	
%>