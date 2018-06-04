<%@ page import="com.oreilly.servlet.*"%>
<%@ page import="com.oreilly.servlet.multipart.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="inha.ac.kr.RandomFileRenamePolicy"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
request.setCharacterEncoding("utf-8");
ServletContext context=getServletContext();
int maxsize=10*1024*1024;		//file 최대 사이즈
String uploadPath=context.getRealPath("image");		//file 업로드 경로
MultipartRequest image=new MultipartRequest(request,uploadPath,maxsize,"utf-8",new RandomFileRenamePolicy());	//file업로드
String path="./image/"+image.getFilesystemName("img");	//file 경로 반환하기위한 변수
%><%=path%>
<!--file 경로 반환-->