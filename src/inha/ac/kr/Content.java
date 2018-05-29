package inha.ac.kr;

public class Content {
	private static String memoStr = "<div class=\\\"memo\\\">" + "<div class=\\\"move\\\">"
			+ "<div class=\\\"option\\\">" + "<i class=\\\"material-icons star\\\">star_border</i>"
			+ "<i class=\\\"material-icons image\\\">add_a_photo</i>"
			+ "<input class=\\\"imageinput\\\" type=\\\"file\\\" name=\\\"image\\\" accept=\\\"image/*\\\">"
			+ "<input class=\\\"memobgcolor\\\" type=\\\"color\\\" name=\\\"color\\\" value=\\\"#FFFFFF\\\">"
			+ "<i class=\\\"material-icons remove\\\">delete</i>" + "</div></div>"
			+ "<input class=\\\"title\\\" value=\\\"Title\\\"><hr>" + "<img class=\\\"imagearea\\\" src=\\\"\\\">"
			+ "<textarea class=\\\"content\\\">Contet</textarea>" + "<div class=\\\"time\\\"></div></div>";
	private static String listStr = "<div class=\\\"boardli\\\"></div>";
	private static String btnzoneStr = "<div class=\\\"buttonzone\\\">"
			+ "<span class=\\\"material-icons add\\\">note_add</span>"
			+ "<span class=\\\"material-icons edit\\\">edit</span>"
			+ "<span class=\\\"material-icons dboard\\\">close</span></div>";
	private static String memolistStr = "<ul class=\\\"memoli\\\"></ul>";
	private static String memoliStr = "<li><i class=\\\"material-icons star\\\">star_border</i>"
			+ "<i class=\\\"material-icons close\\\">close</i></li>";
	private static String searchRetStr = "<div class=\\\"search-result memo\\\">"
			+ "<div class=\\\"search-title\\\"></div><hr>" + "<div class=\\\"search-content\\\"></div></div>";

	public static String getContent() {
		String str = "{\"memoStr\": \"" + memoStr + "\",\"listStr\": \"" + listStr + "\",\"btnzoneStr\": \""
				+ btnzoneStr + "\",\"memolistStr\": \"" + memolistStr + "\",\"memoliStr\": \"" + memoliStr
				+ "\",\"searchRetStr\": \"" + searchRetStr + "\"}";
		return str;
	}
}
