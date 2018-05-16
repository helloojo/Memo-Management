<%@ page import="java.util.*"%>
<%@ page import="java.io.*" %>
<%@ page import="com.oreilly.servlet.*" %>
<%@ page import="com.oreilly.servlet.multipart.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
request.setCharacterEncoding("utf-8");
ServletContext context=getServletContext();
int maxsize=10*1024*1024;
String uploadPath=context.getRealPath("image");
System.out.println(uploadPath);
MultipartRequest image=new MultipartRequest(request,uploadPath,maxsize,"utf-8",new DefaultFileRenamePolicy());
String path="./image/"+image.getFilesystemName("image");
System.out.println(path);
%><%=path%>