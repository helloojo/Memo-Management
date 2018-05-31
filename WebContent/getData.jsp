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
	int value = Integer.parseInt(request.getParameter("value"));		//value값에 맞춰서 query 실행
	//request를 통해서 받아올 parameter를 담을 변수들
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
	String str = "";
	String boardname;
	switch (value) {
	case Value.GETBOARDANDMEMO:		//모든 board와 memo받아서 JSON형식으로 반환
		str = "{ \"board\": ";
		str += Board.getBoard();
		str += ", \"memo\": ";
		str += Memo.getAllMemo();
		str += "}";
%><%=str%>
<%
	break;
	case Value.GETMEMO:				//boardid에 맞는 memo받아서 JSON형식으로 반환
		boardid = request.getParameter("boardid");
		str = Memo.getMemo(boardid);
%><%=str%>
<%
	break;
	case Value.ADDMEMO:				//memo 추가
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
	case Value.UPDATEMEMOTITLE:		//memo title update
		memoid = request.getParameter("memoid");
		title = request.getParameter("title");
		time = request.getParameter("time");
		Memo.updateMemoTitle(memoid, title, time);
		break;
	case Value.UPDATEMEMOCONTENT:	//memo content update
		memoid = request.getParameter("memoid");
		content = request.getParameter("content");
		time = request.getParameter("time");
		Memo.updateMemoContent(memoid, content, time);
		break;
	case Value.UPDATEMEMOCOLOR:		//memo 배경색 update
		memoid = request.getParameter("memoid");
		bgcolor = request.getParameter("bgcolor");
		Memo.updateMemoColor(memoid, bgcolor);
		break;
	case Value.UPDATEMEMOCOOR:		//memo 좌표 update
		memoid = request.getParameter("memoid");
		x = request.getParameter("x");
		y = request.getParameter("y");
		Memo.updateMemoCoordinate(memoid, x, y);
		break;
	case Value.UPDATEMEMOIMP:		//memo 중요도 update
		memoid = request.getParameter("memoid");
		important = request.getParameter("important");
		Memo.updateMemoImportant(memoid, important);
		break;
	case Value.UPDATEMEMOIMAGE:		//memo image경로 update
		memoid = request.getParameter("memoid");
		imagepath = request.getParameter("imagepath");
		time = request.getParameter("time");
		Memo.updateMemoImage(memoid, time, imagepath);
		break;
	case Value.DELETEBOARD:			//board delete
		boardid = request.getParameter("boardid");
		Board.deleteBoard(boardid);
		break;
	case Value.DELETEMEMO:			//memo delete
		memoid = request.getParameter("memoid");
		Memo.deleteMemo(memoid);
		break;
	case Value.UPDATEBOARD:			//board update
		boardid = request.getParameter("boardid");
		boardname = request.getParameter("boardname");
		Board.updateBoard(boardid, boardname);
		break;
	case Value.ADDBOARD:			//board 추가
		boardname = request.getParameter("boardname");
		Board.addBoard(boardname);
		break;
	case Value.INIT:				//App최초 실행 시 html String 반환
		str = Content.getContent();
%><%=str%>
<%
	break;
	default:
		break;
	}
%>