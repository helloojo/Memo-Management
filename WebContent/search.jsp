<%@ page import="java.sql.Statement"%>
<%@ page import="java.sql.PreparedStatement"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="inha.ac.kr.DBconn"%>
<%@ page import="inha.ac.kr.Search"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
	String query=request.getParameter("query");
	String result=Search.getResult(query);
	System.out.println(result);
%><%=result%>