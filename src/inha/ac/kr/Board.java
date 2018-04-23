package inha.ac.kr;

public class Board {
	private int boardID;
	private String boardName;
	private int memoCnt;
	private String boardBgColor;
	public Board(int id,String name,int cnt,String color) {
		boardID=id;
		boardName=name;
		memoCnt=cnt;
		boardBgColor=color;
	}
	public int getBoardID() {
		return boardID;
	}
	public void setBoardID(int boardID) {
		this.boardID = boardID;
	}
	public String getBoardName() {
		return boardName;
	}
	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}
	public int getMemoCnt() {
		return memoCnt;
	}
	public void setMemoCnt(int memoCnt) {
		this.memoCnt = memoCnt;
	}
	public String getBoardBgColor() {
		return boardBgColor;
	}
	public void setBoardBgColor(String boardBgColor) {
		this.boardBgColor = boardBgColor;
	}
	public String getData() {
		return boardID+" "+boardName+" "+memoCnt+" "+boardBgColor;
	}
}
