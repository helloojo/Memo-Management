package inha.ac.kr;

import java.io.File;

import com.oreilly.servlet.multipart.FileRenamePolicy;

public class RandomFileRenamePolicy implements FileRenamePolicy {

	public File rename(File f) {
		String name = f.getName();
		String body = null;
		String ext = null;
		int dot = name.lastIndexOf(".");
		ext = name.substring(dot);		//확장자 (.???) 자름
		body = Long.toString(System.currentTimeMillis());		//현재 시간으로 file이름 변경
		File rename = new File(f.getParent(), body + ext);		//file rename (현재시간.???)
		return rename;
	}
}