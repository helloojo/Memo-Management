package inha.ac.kr;

public class Memo {
	private String title;
	private String content;
	private String time;
	private String bgColor;
	private boolean important;
	private int boardID;
	private int memoID;
	public Memo(String tit,String cnt,String ti,String bgc,boolean imp,int bid,int mid) {
		this.title=tit;
		this.content=cnt;
		this.time=ti;
		this.bgColor=bgc;
		this.important=imp;
		this.boardID=bid;
		this.memoID=mid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getBgColor() {
		return bgColor;
	}
	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}
	public boolean isImportant() {
		return important;
	}
	public void setImportant(boolean important) {
		this.important = important;
	}
	public int getBoardID() {
		return boardID;
	}
	public void setBoardID(int boardID) {
		this.boardID = boardID;
	}
	public int getMemoID() {
		return memoID;
	}
	public void setMemoID(int memoID) {
		this.memoID = memoID;
	}	
}
