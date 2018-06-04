package inha.ac.kr;
/**
 * 
 * @author AYJ
 * getData.jsp에 ajax요청 시
 * 어떤 query를 실행할 지 구분하기 위한 상수 값을 모아놓은 class
 *
 */
public class Value {
	public static final int GETBOARDANDMEMO = 0;
	public static final int GETMEMO = 1;
	public static final int ADDBOARD = 2;
	public static final int ADDMEMO = 3;
	public static final int DELETEBOARD = 4;
	public static final int DELETEMEMO = 5;
	public static final int UPDATEBOARD = 6;
	public static final int UPDATEMEMOTITLE = 7;
	public static final int UPDATEMEMOCONTENT = 8;
	public static final int UPDATEMEMOCOLOR = 9;
	public static final int UPDATEMEMOCOOR = 10;
	public static final int UPDATEMEMOIMP = 11;
	public static final int UPDATEMEMOIMAGE = 12;
	public static final int INIT = 13;
}