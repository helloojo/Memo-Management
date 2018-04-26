package inha.ac.kr;

public class Memo {
	public static String getData(String tit,String cnt,String ti,String bgc,boolean imp,int bid,int mid,int imgid) {
		String str= "{"+
				"\"mid\": "+mid+","+
				"\"bid\": "+bid+","+
				"\"title\": \""+tit+"\","+
				"\"content\": \""+cnt+"\","+
				"\"time\": \""+ti+"\","+
				"\"bgcolor\": \""+bgc+"\","+
				"\"important\": "+imp+","+
				"\"imgid\": "+imgid+"}";
		return str;
		
	}
}
