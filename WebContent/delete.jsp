<%@ page import="java.util.*"%>
<%@ page import="java.io.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
request.setCharacterEncoding("utf-8");
String filename=request.getParameter("path");	//file 이름
ServletContext ctx=getServletContext();
String folder=ctx.getRealPath("image");		//업로드되어있는 경로
File file=new File(folder+"\\"+filename);	//file 객체 가져옴
if(file.delete()) {			//file 삭제
	System.out.println("OK");		//성공
} else {
	System.out.println("FAIL");		//실패
}
%>