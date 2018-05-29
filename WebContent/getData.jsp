<%@ page import="java.sql.Statement"%>
<%@ page import="java.sql.PreparedStatement"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="inha.ac.kr.Board"%>
<%@ page import="inha.ac.kr.Memo"%>
<%@ page import="inha.ac.kr.DBconn"%>
<%@ page import="inha.ac.kr.Value"%>
<%@ page import="inha.ac.kr.Content"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
	int value = Integer.parseInt(request.getParameter("value"));
	String title;
	String content;
	String time;
	String memoid;
	String boardid;
	String bgcolor;
	String x;
	String y;
	String imagepath;
	String important;
	String sql = "";
	String str = "";
	String boardname;
	ResultSet rs = null;
	StringBuilder json = null;
	System.out.println(value + " Called!");
	switch (value) {
	case Value.GETBOARDANDMEMO:
		str = "{ \"board\": ";
		str += Board.getBoard();
		str += ", \"memo\": ";
		str += Memo.getAllMemo();
		str += "}";
%><%=str%>
<%
	break;
	case Value.GETMEMO:
		boardid = request.getParameter("boardid");
		str = Memo.getMemo(boardid);
%><%=str%>
<%
	break;
	case Value.ADDMEMO:
		boardid = request.getParameter("boardid");
		title = request.getParameter("title");
		content = request.getParameter("content");
		time = request.getParameter("time");
		bgcolor = request.getParameter("bgcolor");
		imagepath = request.getParameter("imagepath");
		important = request.getParameter("important");
		x = request.getParameter("x");
		y = request.getParameter("y");
		Memo.addMemo(boardid, title, content, time, bgcolor, imagepath, important, x, y);
		break;
	case Value.UPDATEMEMOTITLE:
		memoid = request.getParameter("memoid");
		title = request.getParameter("title");
		time = request.getParameter("time");
		Memo.updateMemoTitle(memoid, title, time);
		break;
	case Value.UPDATEMEMOCONTENT:
		memoid = request.getParameter("memoid");
		content = request.getParameter("content");
		time = request.getParameter("time");
		Memo.updateMemoContent(memoid, content, time);
		break;
	case Value.UPDATEMEMOCOLOR:
		memoid = request.getParameter("memoid");
		bgcolor = request.getParameter("bgcolor");
		Memo.updateMemoColor(memoid, bgcolor);
		break;
	case Value.UPDATEMEMOCOOR:
		memoid = request.getParameter("memoid");
		x = request.getParameter("x");
		y = request.getParameter("y");
		Memo.updateMemoCoordinate(memoid, x, y);
		break;
	case Value.UPDATEMEMOIMP:
		memoid = request.getParameter("memoid");
		important = request.getParameter("important");
		Memo.updateMemoImportant(memoid, important);
		break;
	case Value.UPDATEMEMOIMAGE:
		memoid = request.getParameter("memoid");
		imagepath = request.getParameter("imagepath");
		time = request.getParameter("time");
		Memo.updateMemoImage(memoid, time, imagepath);
		break;
	case Value.DELETEBOARD:
		boardid = request.getParameter("boardid");
		Board.deleteBoard(boardid);
		break;
	case Value.DELETEMEMO:
		memoid = request.getParameter("memoid");
		Memo.deleteMemo(memoid);
		break;
	case Value.UPDATEBOARD:
		boardid = request.getParameter("boardid");
		boardname = request.getParameter("boardname");
		Board.updateBoard(boardid, boardname);
		break;
	case Value.ADDBOARD:
		boardname = request.getParameter("boardname");
		Board.addBoard(boardname);
		break;
	case Value.INIT:
		str = Content.getContent();
%><%=str%>
<%
	break;
	default:
		break;
	}
%>