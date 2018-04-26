package inha.ac.kr;

public class Board {
	public static String getData(int boardid,String boardname,String boardbgcolor) {
		String str= "{"+
				"\"id\": \""+boardid+"\","+
				"\"name\": \""+boardname+"\","+
				"\"color\": \""+boardbgcolor+"\"}";
		return str;
	}
}
