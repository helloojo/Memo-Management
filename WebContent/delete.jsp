<%@ page import="java.util.*"%>
<%@ page import="java.io.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
request.setCharacterEncoding("utf-8");
String filename=request.getParameter("path");
ServletContext ctx=getServletContext();
String folder=ctx.getRealPath("image");
File file=new File(folder+"\\"+filename);
if(file.delete()) {			//파일 삭제
	System.out.println("OK");
} else {
	System.out.println("FAIL");
}
%>