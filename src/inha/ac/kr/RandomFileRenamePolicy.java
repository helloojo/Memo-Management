package inha.ac.kr;

import java.io.File;

import com.oreilly.servlet.multipart.FileRenamePolicy;

public class RandomFileRenamePolicy implements FileRenamePolicy {

	public File rename(File f) {
		String name = f.getName();
		String body = null;
		String ext = null;
		int dot = name.lastIndexOf(".");
		ext = name.substring(dot);
		body = Long.toString(System.currentTimeMillis());
		File rename = new File(f.getParent(), body + ext);
		return rename;
	}
}