<%@ page import="inha.ac.kr.Search"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
	String query = request.getParameter("query"); //찾을 메모 내용
	String result = Search.getResult(query); //검색결과
%><%=result%>