var MemoManage = (function() {
	var $board = $(".board");
	var curboard = -1;
	var memoStr = '<div class="memo">' +
		'<div class="move">' +
		'<div class="option">' +
		'<i class="material-icons star">star_border</i>' +
		'<i class="material-icons image">add_a_photo</i>' +
		'<input class="imageinput" type="file" name="image" accept="image/*">' +
		'<input class="memobgcolor" type="color" name="color" value="#FFFFFF">' +
		'<i class="material-icons remove">delete</i>' +
		'</div></div>' +
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
	var memoliStr = '<li></li>';
	var memobtnStr = '<i class="material-icons star">star_border</i>' +
		'<i class="material-icons close">close</i>';

	$(".sbbtn").click(function() {
		var boardname = $("input[name=name]").val();
		var boardbgcolor = $("input[name=boardbgcolor]").val();
		addBoardToDB(boardname, boardbgcolor);
		$(".modal").css("display", "none");
		makeList();
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

	//n을 앞에 0이 있게 digits 자리 수로 만드는 함수
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

	//memo 생성시 색상 랜덤 결정 100000~F5AAA0
	function getRandomColor() {
		return "#" + format(Math.floor((Math.random() * 15000000) + 777777).toString(16), 6);
	}

	function setRandomPos() {
		return {
			x: Math.floor(Math.random() * ($board[0].clientWidth - 300)),
			y: Math.floor(Math.random() * ($board[0].clientHeight - 350)) + 50
		};
	}

	function makeList() {
		$(".boardlist").empty();
		var board = getBoardfromDB();
		var memo = null;
		var list = null;
		var panel = null;
		var btn = null;
		var memolist = null;
		for (var i in board) {
			if (curboard == -1) {
				curboard = board[i].id;
			}
			memo = getMemofromDB(board[i].id);
			list = $(listStr);
			list.html(board[i].name);
			panel = $("<div class=\"panel\"></div>");
			panel.data("boardid", board[i].id);
			btn = $(btnzoneStr);
			memolist = $(memolistStr);
			setBoardListEvent(btn);
			for (var j in memo) {
				memolist.append(addMemoList(memo[j]));
			}
			panel.append(btn).append(memolist);
			$(".boardlist").append(list);
			$(".boardlist").append(panel);
		}
		$(".boardlist").accordion({
			header: "div.boardli",
			heightStyle: "content",
			activate: function(event, ui) { //클릭시 보드안에 저장되있는 메모 출력
				curboard=ui.newPanel.data("boardid");
				print(curboard);
			}
		});
	}

	function setBoardListEvent(btn) {
		var add = btn.find(".add");
		var edit = btn.find(".edit");
		var dboard = btn.find(".dboard");
		add.click(function() {
			addMemo($(this).parent().parent().data("boardid"));
		});
		edit.click(function() {
		});
		dboard.click(function() {
			var boardid=$(this).parent().parent().data("boardid");
			deleteBoardinDB(boardid);
			if(curboard==boardid) {
				curboard=-1;
			}
			makeList();
			print(curboard);
		});
	}

	function addMemoList(memo) {
		var memoli = null;
		var memobtn = null;
		memoli = $(memoliStr);
		memobtn = $(memobtnStr);
		memoli.html(memo.title);
		memoli.data("memoid", memo.memoid);
		memoli.data("important", memo.important);
		if (memo.important) {
			memobtn.find(".star").html("star");
		}
		setMemoListEvent(memobtn);
		memoli.append(memobtn);
		return memoli;
	}

	function setMemoListEvent(memobtn) {
		var star = memobtn.find(".star");
		var close = memobtn.find(".close");
		star.click(function() {
			updateMemoImportant(memobtn.parent(),!memobtn.parent().data("important"));
			makeList();
			print(curboard);
		});
		close.click(function() {
			deleteMemo(memobtn.parent());
			makeList();
			print(curboard);
		});
	}

	function print(boardid) {
		if (boardid == -1) return;
		$(".memo").remove();
		var memo = getMemofromDB(boardid);
		for (var i in memo) {
			var data = memo[i];
			var $memo = $(memoStr);
			$memo.data("memoid", data.mid);
			$memo.data("imageid", data.imgid);
			$memo.data("important", data.important);
			$memo.find(".title").val(data.title).css("background", data.bgcolor);
			$memo.find(".content").html(data.content).css("background", data.bgcolor);
			$memo.find(".time").html(data.time);
			$memo.find(".memobgcolor").val(data.bgcolor);
			$memo.css("background", data.bgcolor);
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

	function setMemoEvent(memo) {
		var remove = memo.find(".remove");
		var star = memo.find(".star");
		var content = memo.find(".content");
		var color = memo.find(".memobgcolor");
		var title = memo.find(".title");
		var time = memo.find(".time");
		var image=memo.find(".image");
		var imageinput=memo.find(".imageinput");
		remove.click(function() {
			deleteMemo(memo);
		});
		star.click(function() {
			updateMemoImportant(memo,!memo.data("important"));
			makeList();
			print(curboard);
		});
		image.click(function() {
			imageinput.click();
		})
		imageinput.submit(function(e) {
			//todo image upload 기능 구현
			// $.ajax({
			// 	url: "",
			// 	type: "POST",
			// 	data:"",
			// 	contentType: "multipart/form-data",
			// 	processData: false,
			// 	success: function() {
			// 	}
			// });
		})
		content.keyup(function() {
			adjustContent($(this));
		});
		color.change(function() {
			var bg = color.val();
			memo.css("background", bg);
			title.css("background", bg);
			content.css("background", bg);
			time.html(getTime());
			updateMemoColor(memo);
			updateMemoTime(memo);
		});
		title.focusin(function() {
			$(this.parentElement).css("z-index", 987654);
		});
		content.focusin(function() {
			$(this.parentElement).css("z-index", 987654);
		});
		title.focusout(function() {
			$(this.parentElement).css("z-index", 98765);
			time.html(getTime());
			title.attr("value", title.val());
			updateMemoTime(memo);
			updateMemoTitle(memo);
			makeList();
			print(curboard);
		});
		content.focusout(function() {
			$(this.parentElement).css("z-index", 98765);
			time.html(getTime());
			content.html(content.val());
			updateMemoTime(memo);
			updateMemoContent(memo);
		});
		memo.mousedown().draggable({
			handle: ".move",
			stack: ".board div",
			containment: "parent",
			scroll: false,
			stop: function(event, ui) {
				var coor = { x: ui.position.left, y: ui.position.top };
				console.log($(this));
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

	function getImagePath(imageid) {
		$.ajax({});
	}

	function addMemo(boardid) {
		addMemoToDB(boardid);
		if (curboard == boardid) {
			print(boardid);
		}
	}

	function deleteMemo(memo) {
		var memoid=memo.data("memoid");
		deleteMemoinDB(memoid);
		makeList();
		print(curboard);
	}

	//현재날짜, 시간 구하는 함수 (yyyy-mm-dd hh:mm:ss)
	function getTime() {
		var d = new Date();
		var s =
			format(d.getFullYear(), 4) + "-" +
			format(d.getMonth() + 1, 2) + "-" +
			format(d.getDate(), 2) + " " +
			format(d.getHours(), 2) + ":" +
			format(d.getMinutes(), 2) + ":" +
			format(d.getSeconds(), 2);
		return s;
	}



	function addMemoToDB(boardid) {
		var coor = setRandomPos();
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 2,
				boardid: boardid,
				title: "Title",
				content: "Content",
				time: getTime(),
				bgcolor: getRandomColor(),
				imageid: null,
				important: false,
				x: coor.x,
				y: coor.y
			},
			async: false
		});
	}

	function addBoardToDB(boardname, boardbgcolor) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 13,
				boardname: boardname,
				boardbgcolor: boardbgcolor
			},
			async: false
		});
	}

	function deleteMemoinDB(memoid) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 11,
				memoid: memoid
			}
		});
	}

	function deleteBoardinDB(boardid) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 10,
				boardid: boardid
			}
		});
	}

	function updateMemoTitle(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 3,
				memoid: memo.data("memoid"),
				title: memo.find(".title").val()
			}
		});
	}

	function updateMemoContent(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 4,
				memoid: memo.data("memoid"),
				content: memo.find(".content").val()
			}
		});
	}

	function updateMemoTime(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 5,
				memoid: memo.data("memoid"),
				time: memo.find(".time").html()
			}
		});
	}

	function updateMemoColor(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 6,
				memoid: memo.data("memoid"),
				bgcolor: memo.css("background")
			}
		});
	}

	function updateMemoCoordinate(memo, coor) {
		console.log(memo.data());
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 7,
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
				value: 8,
				memoid: memo.data("memoid"),
				important: memo.data("important")
			}
		});
	}

	function updateMemoImage(memo) {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 9,
				memoid: memo.data("memoid"),
				imageid: memo.data("imageid")
			}
		});
	}

	function updateBoardinDB(boardid) {}

	function getMemofromDB(boardid) {
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
				memo = $.parseJSON(data);
			}
		});
		return memo;
	}

	function getBoardfromDB() {
		var board;
		$.ajax({
			url: "./getData.jsp",
			datatype: "json",
			async: false,
			data: { value: 0 },
			success: function(data) {
				board = $.parseJSON(data);
			}
		});
		return board;
	}
	return {
		init: function() {
			makeList();
			print(curboard);
		}
	};
})();

$(document).ready(function() {
	MemoManage.init();
});