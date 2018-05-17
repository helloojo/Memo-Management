var MemoManage = (function() {
	var $board = $(".board");
	var $boardlist = $(".boardlist");
	var curboard = -1;
	var memoStr = '<div class="memo">' +
		'<div class="move">' +
		'<div class="option">' +
		'<i class="material-icons star">star_border</i>' +
		'<i class="material-icons image">add_a_photo</i>' +
		'<input class="imageinput" type="file" name="image" accept="image/*">' +
		'<input class="memobgcolor" type="color" name="color" value="#FFFFFF">' +
		'<i class="material-icons remove">delete</i>' + '</div></div>' +
		'<input class="title" value="Title"><hr>' +
		'<img class="imagearea" src=\"\">' +
		'<textarea class="content">Content</textarea>' +
		'<div class="time"></div></div>';
	var listStr = '<div class="boardli"></div>';
	var btnzoneStr = '<div class="buttonzone">' +
		'<span class="material-icons add">note_add</span>' +
		'<span class="material-icons edit">edit</span>' +
		'<span class="material-icons dboard">close</span></div>';
	var memolistStr = '<ul class="memoli"></ul>';
	var memoliStr = '<li><i class="material-icons star">star_border</i>' +
		'<i class="material-icons close">close</i></li>';
	var index = 0;
	$(".sbbtn").click(function() {
		var boardname = $("input[name=name]").val();
		addBoardToDB(boardname);
		$(".modal").css("display", "none");
		getBoardandMemofromDB();
	});
	$(".ccbtn").click(function() {
		$(".modal").css("display", "none");
	});
	$("#addboard").click(function() {
		$(".modal").css("display", "block");
		$(".formforadd").css("display", "block");
		$(".formfordelete").css("display", "none");
		$(".header > h3").html("Create New Board");
		$(".sbbtn").attr("value", "Create");
	});
	boardlist.accordion({
		header: "div.boardli",
		heightStyle: "content",
		active: index,
		activate: function(event, ui) { // 클릭시 보드안에 저장되있는 메모 출력
			index = ui.newHeader.index() / 2;
			curboard = ui.newPanel.data("boardid");
			print(curboard); // 성능문제
		}
	});

	// n을 앞에 0이 있게 digits 자리 수로 만드는 함수
	function format(n, digits) {
		var zero = "";
		n = n.toString();
		if (n.length < digits) {
			for (i = 0; i < digits - n.length; i++) {
				zero += "0";
			}
		}
		return zero + n;
	}

	// memo 생성시 색상 랜덤 결정 100000~F5AAA0
	function getRandomColor() {
		return "#" +
			format(Math.floor((Math.random() * 15000000) + 777777)
				.toString(16), 6);
	}

	function setRandomPos() {
		return {
			x: Math.floor(Math.random() * ($board[0].clientWidth - 300)),
			y: Math.floor(Math.random() * ($board[0].clientHeight - 350)) + 50
		};
	}

	// 현재날짜, 시간 구하는 함수 (yyyy-mm-dd hh:mm:ss)
	function getTime() {
		var d = new Date();
		var s = format(d.getFullYear(), 4) + "-" + format(d.getMonth() + 1, 2) +
			"-" + format(d.getDate(), 2) + " " + format(d.getHours(), 2) +
			":" + format(d.getMinutes(), 2) + ":" +
			format(d.getSeconds(), 2);
		return s;
	}

	function makeList2(board, memo) {
		boardlist.empty();
		var list = null;
		var panel = null;
		var btn = null;
		var memolist = null;
		for (var i in board) {
			if (curboard == -1) {
				curboard = board[i].id;
			}
			if (curboard == board[i].id) {
				print2(memo, board[i].id);
			}
			list = $(listStr);
			list.html(board[i].name);
			panel = $("<div class=\"panel\"></div>");
			panel.data("boardid", board[i].id);
			btn = $(btnzoneStr);
			memolist = $(memolistStr);
			setBoardListEvent(btn);
			for (var j in memo) {
				if (memo[j].bid == board[i].id) {
					memolist.append(addMemoList(memo[j]));
				}
			}
			panel.append(btn).append(memolist);
			boardlist.append(list);
			boardlist.append(panel);
		}
		boardlist.accordion("refresh");
		boardlist.accordion("option", "active", index);
	}

	function setBoardListEvent(btn) {
		var add = btn.find(".add");
		var edit = btn.find(".edit");
		var dboard = btn.find(".dboard");
		add.click(function() {
			addMemo($(this).parent().parent().data("boardid"));
		});
		edit.click(function() {}); // edit구현 필요
		dboard.click(function() {
			var boardid = $(this).parent().parent().data("boardid");
			var panel = $(this).parent().parent();
			var list = $(this).parent().parent().prev();
			deleteBoardinDB(boardid);
			panel.remove();
			list.remove();
			curboard = boardlist.find(".panel").data("boardid");
			if (curboard != null) {
				index = 0;
				boardlist.accordion("refresh");
				boardlist.accordion("option", "active", index);
			} else {
				$(".memo").remove();
			}
		});
	}

	function addMemoList(memo) {
		var memoli = null;
		memoli = $(memoliStr);
		memoli.append(memo.title);
		memoli.data("memoid", memo.mid);
		memoli.data("important", memo.important);
		if (memo.important) {
			memoli.find(".star").html("star");
		}
		setMemoListEvent(memoli);
		return memoli;
	}

	function setMemoListEvent(memoli) {
		var star = memoli.find(".star");
		var close = memoli.find(".close");
		star.click(function() {
			memoli.data("important", !memoli.data("important"));
			updateMemoImportant(memoli);
			var $memo = $(".memo");
			var memoid = memoli.data("memoid");
			for (var i in $memo) {
				var $find = $($memo[i]);
				if ($find.data("memoid") == memoid) {
					$find.data("important", memoli.data("important"));
					if (memoli.data("important")) {
						star.html("star");
						$find.find(".star").html("star");
					} else {
						star.html("star_border");
						$find.find(".star").html("star_border");
					}
					break;
				}
			}
		});
		close.click(function() {
			deleteMemo(memoli);
		});
	}

	function print(boardid) {
		if (boardid == -1)
			return;
		var memo = getMemofromDB(boardid);
		print2(memo, boardid);
	}

	function print2(memo, boardid) {
		$(".memo").remove();
		for (var i in memo) {
			var data = memo[i];
			if (data.bid == boardid) {
				var $memo = $(memoStr);
				$memo.data("memoid", data.mid);
				$memo.data("bgcolor", data.bgcolor);
				$memo.data("imagepath", data.imagepath);
				$memo.data("important", data.important);
				$memo.find(".title").val(data.title).css("background",
					data.bgcolor);
				$memo.find(".content").html(data.content).css("background",
					data.bgcolor);
				$memo.find(".time").html(data.time);
				$memo.find(".memobgcolor").val(data.bgcolor);
				if (data.imagepath != "null") {
					$memo.find(".imagearea").attr("src", data.imagepath);
				}
				$memo.css("background-color", data.bgcolor);
				if (data.important) {
					$memo.find(".star").html("star");
				}
				setMemoEvent($memo);
				$memo.offset({
					left: data.x,
					top: data.y
				});
				$board.append($memo);
			}
		}
	}

	function setMemoEvent(memo) {
		var remove = memo.find(".remove");
		var star = memo.find(".star");
		var content = memo.find(".content");
		var color = memo.find(".memobgcolor");
		var title = memo.find(".title");
		var time = memo.find(".time");
		var image = memo.find(".image");
		var imageinput = memo.find(".imageinput");
		remove.click(function() {
			deleteMemo(memo);
		});
		star.click(function() {
			memo.data("important", !memo.data("important"));
			updateMemoImportant(memo);
			var $memoli = $("li");
			var memoid = memo.data("memoid");
			for (var i in $memoli) {
				var $find = $($memoli[i]);
				if ($find.data("memoid") == memoid) {
					$find.data("important", memo.data("important"));
					if (memo.data("important")) {
						star.html("star");
						$find.find(".star").html("star");
					} else {
						star.html("star_border");
						$find.find(".star").html("star_border");
					}
					break;
				}
			}
		});
		image.click(function() {
			imageinput.click();
		});
		imageinput.change(function(e) {
			var file = new FormData();
			file.append("img", imageinput[0].files[0]);
			uploadImage(memo, file);
		});
		content.keyup(function() {
			adjustContent($(this));
		});
		color.change(function() {
			var bg = color.val();
			memo.data("bgcolor", bg);
			memo.css("background-color", bg);
			title.css("background-color", bg);
			content.css("background-color", bg);
			updateMemoColor(memo);
		});
		title.focusin(function() {
			$(this.parentElement).css("z-index", 98765);
		});
		content.focusin(function() {
			$(this.parentElement).css("z-index", 98765);
		});
		title.focusout(function() {
			$(this.parentElement).css("z-index", 9876);
			if (title.val() != title.attr("value")) {
				time.html(getTime());
				title.attr("value", title.val());
				var $memoli = $("li");
				var memoid = memo.data("memoid");
				for (var i in $memoli) {
					if ($($memoli[i]).data("memoid") == memoid) {
						$memoli[i].lastChild.data = title.val();
						break;
					}
				}
				updateMemoTitle(memo);
			}
		});
		content.focusout(function() {
			$(this.parentElement).css("z-index", 9876);
			if (content.val() != content.html()) {
				time.html(getTime());
				content.html(content.val());
				updateMemoContent(memo);
			}
		});
		memo.mousedown().draggable({
			handle: ".move",
			stack: ".board div",
			containment: "parent",
			scroll: false,
			stop: function(event, ui) {
				var coor = {
					x: ui.position.left,
					y: ui.position.top
				};
				updateMemoCoordinate($(this), coor);
			}
		}).css("position", "absolute");
	}

	function adjustContent(content) {
		if (content.prop("scrollHeight") > 155) {
			content.css("height", "auto");
			if (content.prop("scrollHeight") <= 155) {
				content.css("height", 155);
			} else {
				content.css("height", content.prop("scrollHeight"));
			}
		}
	}

	function addMemo(boardid) {
		addMemoToDB(boardid);
	}

	function deleteMemo(memo) {
		var memoid = memo.data("memoid");
		var boardid = memo.data("boardid");
		if (memo[0].nodeName == "DIV") {
			memo.remove();
			var $memoli = $("li");
			for (var i in $memoli) {
				var $find = $($memoli[i]);
				if ($find.data("memoid") == memoid) {
					$find.remove();
					break;
				}
			}
		} else {
			memo.remove();
			var $memo = $(".memo");
			for (var i in $memo) {
				var $find = $($memo[i]);
				if ($find.data("memoid") == memoid) {
					$find.remove();
					break;
				}
			}
		}
		deleteMemoinDB(memoid);
	}

	function uploadImage(memo, image) {
		$.ajax({
			url: "./upload.jsp",
			type: "POST",
			data: image,
			contentType: false,
			cache: false,
			processData: false,
			success: function(path) {
				path = path.trim();
				memo.data("imagepath", path);
				memo.find(".imagearea").attr("src", path);
				updateMemoImage(memo);
			}
		});
	}
	// DB Connection
	function getBoardandMemofromDB() {
		$.ajax({
			url: "./getData.jsp",
			datatype: "json",
			data: {
				value: 0
			},
			beforeSend: function() {
				$("#loading").css("display", "block");
			},
			success: function(data) {
				$("#loading").css("display", "none");
				data = $.parseJSON(data);
				makeList2(data.board, data.memo);
			}
		});
	}

	function getMemofromDB(boardid) {
		$("#loading").css("display", "block");
		var memo;
		$.ajax({
			url: "./getData.jsp",
			datatype: "json",
			async: false,
			data: {
				value: 1,
				boardid: boardid
			},
			success: function(data) {
				$("#loading").css("display", "none");
				memo = $.parseJSON(data);
			}
		});
		return memo;
	}

	function addBoardToDB(boardname) {
		$("#loading").css("display", "block");
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 2,
				boardname: boardname
			},
			success: function() {
				$("#loading").css("display", "none");
				getBoardandMemofromDB();
			}
		});
	}

	function addMemoToDB(boardid) {
		var coor = setRandomPos();
		$("#loading").css("display", "block");
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 3,
				boardid: boardid,
				title: "Title",
				content: "Content",
				time: getTime(),
				bgcolor: getRandomColor(),
				imagepath: null,
				important: false,
				x: coor.x,
				y: coor.y
			},
			success: function() {
				$("#loading").css("display", "none");
				getBoardandMemofromDB();
			}
		});
	}

	function deleteBoardinDB(boardid) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 4,
				boardid: boardid
			}
		});
	}

	function deleteMemoinDB(memoid) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 5,
				memoid: memoid
			}
		});
	}

	function updateBoardinDB(boardid, boardname) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 6,
				boardid: boardid,
				boardname: boardname
			}
		});
	}

	function updateMemoTitle(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 7,
				memoid: memo.data("memoid"),
				title: memo.find(".title").val(),
				time: memo.find(".time").html()
			}
		});
	}

	function updateMemoContent(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 8,
				memoid: memo.data("memoid"),
				content: memo.find(".content").val(),
				time: memo.find(".time").html()
			}
		});
	}

	function updateMemoColor(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 9,
				memoid: memo.data("memoid"),
				bgcolor: memo.data("bgcolor")
			}
		});
	}

	function updateMemoCoordinate(memo, coor) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 10,
				memoid: memo.data("memoid"),
				x: coor.x,
				y: coor.y
			}
		});
	}

	function updateMemoImportant(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 11,
				memoid: memo.data("memoid"),
				important: memo.data("important")
			}
		});
	}

	function updateMemoImage(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 12,
				memoid: memo.data("memoid"),
				imagepath: memo.data("imagepath")
			}
		});
	}

	function getStringfromDB() {
		$.ajax({

		});
	}

	return {
		init: function() {
			$.ajaxSetup({
				type: "POST"
			});
			getBoardandMemofromDB();
		}
	};
})();

window.onload = function() {
	MemoManage.init();
}