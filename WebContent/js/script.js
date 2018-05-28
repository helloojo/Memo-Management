var MemoManage = (function() {
	var $board = $(".board");
	var $boardlist = $(".boardlist");
	var $modal = $(".modal");
	var $search = $("#search");
	var $searchresult = $(".searchresult");
	var Content = {
		memoStr: "",
		listStr: "",
		btnzoneStr: "",
		memolistStr: "",
		memoliStr: "",
		searchRetStr: ""
	};
	var curboard = -1; //현재 boardid
	var index = 0; //accordion index

	// eventListener
	$search.focusin(function() {		//search bar에 focus시 결과화면 출력
		$searchresult.css("display", "flex");
	});
	$search.focusout(function() {		//focus out시 결과화면 숨기기
		$search.val("");
		$searchresult.empty();
		$searchresult.css("display", "none");
	});
	$search.keyup(search);		//검색기능
	$(".sbbtn").click(function() {
		var boardname = $("input[name=name]").val();
		if ($(this).attr("value") == "Create") { //Board 추가
			DBConn.addBoardtoDB(boardname);
		} else { //Board 수정
			var boardid = $(this).data("boardid");
			DBConn.updateBoardinDB(boardid, boardname);
		}
		$modal.css("display", "none");
	});
	$(".ccbtn").click(function() {
		$modal.css("display", "none"); //modal창 취소
	});
	$("#addboard").click(function() { //modal창 board추가형식으로 변경
		$("input[name=name]").val("");
		$modal.css("display", "block");
		$(".header > h3").html("Create New Board");
		$(".sbbtn").attr("value", "Create");
	});
	$boardlist.accordion({
		header: "div.boardli",
		heightStyle: "content",
		active: index,
		activate: function(event, ui) { // 클릭시 보드안에 저장되있는 메모 출력
			index = ui.newHeader.index() / 2;
			curboard = ui.newPanel.data("boardid");
			DBConn.getMemofromDB(curboard);
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
	// memo 생성시 위치 랜덤 결정
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

	function makelist(board, memo) { //board list출력 함수
		$boardlist.empty(); //list 지우기
		var list = null;
		var panel = null;
		var btn = null;
		var memolist = null;
		for (var i in board) {
			if (curboard == -1) {
				curboard = board[i].id; //초기상태일때 첫번째 board를 출력값으로 설정
				index = 0;
			}
			if (curboard == board[i].id) {
				print(memo, board[i].id); //메모 출력
			}
			list = $(Content.listStr);
			list.html(board[i].name);
			panel = $("<div class=\"panel\"></div>");
			panel.data("boardid", board[i].id);
			btn = $(Content.btnzoneStr);
			memolist = $(Content.memolistStr);
			setBoardListEvent(btn); //이벤트리스너 추가
			for (var j in memo) {
				if (memo[j].bid == board[i].id) {
					memolist.append(addMemoList(memo[j]));
				}
			}
			panel.append(btn).append(memolist);
			$boardlist.append(list);
			$boardlist.append(panel);
		}
		if ($boardlist.accordion()) { //새로운 DOM 요소가 추가되었으므로 accordion 이벤트 다시설정
			$boardlist.accordion("destroy").accordion({
				header: "div.boardli",
				heightStyle: "content",
				active: index,
				activate: function(event, ui) { // 클릭시 보드안에 저장되있는 메모 출력
					index = ui.newHeader.index() / 2;
					curboard = ui.newPanel.data("boardid");
					DBConn.getMemofromDB(curboard);
				}
			});
		}
	}

	function setBoardListEvent(btn) {
		var add = btn.find(".add");
		var edit = btn.find(".edit");
		var dboard = btn.find(".dboard");
		add.click(function() {
			DBConn.addMemotoDB($(this).parent().parent().data("boardid")); //memo 추가
		});
		edit.click(function() { //board 수정
			var boardid = $(this).parent().parent().data("boardid");
			var boardname = this.parentElement.parentElement.previousSibling.innerText;
			$(".sbbtn").data("boardid", boardid);
			$("input[name=name]").val(boardname);
			$modal.css("display", "block");
			$(".header > h3").html("Modify Board");
			$(".sbbtn").attr("value", "Modify");
		});
		dboard.click(function() { //사용자에게 확인 후 board 삭제
			if (confirm("Are You Sure Delete this Board?\nAll your memos will be deleted")) {
				var boardid = $(this).parent().parent().data("boardid");
				DBConn.deleteBoardinDB(boardid);
			}
		});
	}

	function addMemoList(memo) {
		var memoli = null;
		memoli = $(Content.memoliStr);
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
			DBConn.updateMemoImportant(memoli);
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

	function print(memo, boardid) {
		$(".memo").remove();
		for (var i in memo) {
			var data = memo[i];
			if (data.bid == boardid) {
				var $memo = $(Content.memoStr);
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
			DBConn.updateMemoImportant(memo);
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
			if (imageinput[0].files[0]) {
				var file = new FormData();
				var imagepath = memo.data("imagepath");
				if (imagepath != "null") {
					deleteImage(imagepath); //만약 기존 사진파일이 있으면 삭제
				}
				file.append("img", imageinput[0].files[0]);
				uploadImage(memo, file);
			}
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
			DBConn.updateMemoColor(memo);
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
				DBConn.updateMemoTitle(memo);
			}
		});
		content.focusout(function() {
			$(this.parentElement).css("z-index", 9876);
			if (content.val() != content.html()) {
				time.html(getTime());
				content.html(content.val());
				DBConn.updateMemoContent(memo);
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
				DBConn.updateMemoCoordinate($(this), coor);
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

	function deleteMemo(memo) {
		var memoid = memo.data("memoid");
		var boardid = memo.data("boardid");
		var imagepath = memo.data("imagepath");
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
		if (imagepath != "null") {
			deleteImage(imagepath); //만약 사진파일이 있으면 삭제
		}
		DBConn.deleteMemoinDB(memoid);
	}

	function deleteImage(path) {
		$.ajax({
			url: "./delete.jsp",
			data: { path: path.slice(8) }
		});
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
				DBConn.updateMemoImage(memo);
			}
		});
	}

	function search(e) {
		$.ajax({
			url: "./search.jsp",
			data: {
				query: e.target.value
			},
			success: function(data) {
				data=$.parseJSON(data);
				printSearchResult(data);
			}
		});
	}
	function printSearchResult(data) {
		$searchresult.empty();
		for(var i in data) {
			var searchret=$(Content.searchRetStr);
			searchret.data("memoid",data[i].mid);
			searchret.data("boardid",data[i].bid);
			searchret.find(".search-title").html(data[i].title+" - "+data[i].boardname);
			searchret.find(".search-content").html(data[i].content);
			searchret.css("background-color",data[i].bgcolor);
			$searchresult.append(searchret);
		}
	}

	var DBConn = {			// DB Connection
		getBoardandMemofromDB: function() {
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
					makelist(data.board, data.memo);
				}
			});
		},
		getMemofromDB: function(boardid) {
			$("#loading").css("display", "block");
			$.ajax({
				url: "./getData.jsp",
				datatype: "json",
				data: {
					value: 1,
					boardid: boardid
				},
				success: function(data) {
					data = $.parseJSON(data);
					print(data, boardid);
					$("#loading").css("display", "none");
				}
			});
		},
		addBoardtoDB: function(boardname) {
			$("#loading").css("display", "block");
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 2,
					boardname: boardname
				},
				success: function() {
					$("#loading").css("display", "none");
					DBConn.getBoardandMemofromDB();
				}
			});
		},
		addMemotoDB: function(boardid) {
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
					DBConn.getBoardandMemofromDB();
				}
			});
		},
		deleteBoardinDB: function(boardid) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 4,
					boardid: boardid
				},
				success: function() {
					curboard = -1;
					DBConn.getBoardandMemofromDB();
				}
			});
		},
		deleteMemoinDB: function(memoid) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 5,
					memoid: memoid
				}
			});
		},
		updateBoardinDB: function(boardid, boardname) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 6,
					boardid: boardid,
					boardname: boardname
				},
				success: DBConn.getBoardandMemofromDB
			});
		},
		updateMemoTitle: function(memo) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 7,
					memoid: memo.data("memoid"),
					title: memo.find(".title").val(),
					time: memo.find(".time").html()
				}
			});
		},
		updateMemoContent: function(memo) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 8,
					memoid: memo.data("memoid"),
					content: memo.find(".content").val(),
					time: memo.find(".time").html()
				}
			});
		},
		updateMemoColor: function(memo) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 9,
					memoid: memo.data("memoid"),
					bgcolor: memo.data("bgcolor")
				}
			});
		},
		updateMemoCoordinate: function(memo, coor) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 10,
					memoid: memo.data("memoid"),
					x: coor.x,
					y: coor.y
				}
			});
		},
		updateMemoImportant: function(memo) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 11,
					memoid: memo.data("memoid"),
					important: memo.data("important")
				}
			});
		},
		updateMemoImage: function(memo) {
			$.ajax({
				url: "./getData.jsp",
				data: {
					value: 12,
					memoid: memo.data("memoid"),
					imagepath: memo.data("imagepath")
				}
			});
		}
	};

	function initPage() {
		$.ajax({
			url: "./getData.jsp",
			data: {
				value: 13
			},
			beforeSend: function() {
				$("#loading").css("display", "block");
			},
			success: function(data) {
				data = $.parseJSON(data);
				Content.memoStr = data.memoStr;
				Content.listStr = data.listStr;
				Content.btnzoneStr = data.btnzoneStr;
				Content.memolistStr = data.memolistStr;
				Content.memoliStr = data.memoliStr;
				Content.searchRetStr=data.searchRetStr;
				DBConn.getBoardandMemofromDB();
			}
		});
	}

	return {
		init: function() {
			$.ajaxSetup({
				type: "POST"
			});
			initPage();
		}
	};
})();

window.onload = function() {
	MemoManage.init();
}