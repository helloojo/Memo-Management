<%@ page import="com.oreilly.servlet.*" %>
<%@ page import="com.oreilly.servlet.multipart.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*" %>
<%@ page import="inha.ac.kr.RandomFileRenamePolicy" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
request.setCharacterEncoding("utf-8");
ServletContext context=getServletContext();
int maxsize=10*1024*1024;
String uploadPath=context.getRealPath("image");
MultipartRequest image=new MultipartRequest(request,uploadPath,maxsize,"utf-8",new RandomFileRenamePolicy());
String path="./image/"+image.getFilesystemName("img");
%><%=path%>