var MemoManage = (function() {
	var board = $(".board");
	var add = $(".add");
	var edit = $(".edit");
	var dboard = $(".dboard");
	var boardli = $(".boardli");
	var boardArr = [];
	//전체 보드 저장 배열
	var boardcnt = 0;
	//전체보드 수
	var curBoard = 0;
	//현재 출력중인 보드

	//메모 생성시 랜덤 위치 설정
	function setRandomPos(memo) {
		memo.y=Math.floor(Math.random() * (board[0].clientHeight - 350)) + 50;
		memo.x=Math.floor(Math.random() * (board[0].clientWidth - 300));
		memo.offset({
			top: y,
			left: x
		});
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

//test
	function btnzone() {
		this.buttonzone=$(document.createElement("div"));
		this.add=$(document.createElement("span"));
		this.edit=$(document.createElement("span"));
		this.close=$(document.createElement("span"));
		this.buttonzone.addClass("buttonzone");
		this.add.addClass("material-icons add").html("note_add");
		this.edit.addClass("material-icons edit").html("edit");
		this.close.addClass("material-icons dboard").html("close");
		this.buttonzone.append(this.add);
		this.buttonzone.append(this.edit);
		this.buttonzone.append(this.close);
	}
	function memolist(idx) {
		this.memoli=$(document.createElement("ul"));
		this.memoli.addClass("memoli");
		this.memolistArr=[];
		for(i=0;i<boardArr[idx].memocnt;i++) {
			this.memolistArr[i]=new memoli(boardArr[idx].memoArr[i].title);
			this.memoli.append(this.memolistArr[i].li);
		}
	}
	function memoli(title) {
		this.li=$(document.createElement("li"));
		this.li.html(title);
		this.btn=new memobtn();
		li.append(this.btn.star).append(this.btn.close);
	}
	function memobtn() {
		this.star=$(document.createElement("i"));
		this.close=$(document.createElement("i"));
		this.star.addClass("material-icons star").html("star_border");
		this.close.addClass("material-icons close").html("close");
	}
	function list(idx) {
		this.boardidx=idx;
		this.boardli=$(document.createElement("div"));
		this.boardli.addClass("boardli");
		this.boardli.html(boardArr[idx].boardname+" ("+boardArr[idx].memocnt+")")
		this.div=$(document.createElement("div"));
		this.btn=new btnzone();
		this.div.append(this.btn.buttonzone);
		this.list=new memolist(idx);
		this.div.append(this.list.memoli);
	}
	function setEvent(list) {
		list.btn.add.click(function() {
		});
		list.btn.edit.click(function() {
		});
		list.btn.close.click(function() {
		});
		for(i=0;i<boardArr[list.boardidx].memocnt;i++) {
			list.list.memolistArr[i].btn.star.click(function() {
			});
			list.list.memolistArr[i].btn.close.click(function() {
			});
		}
	}

function addlist() {

}

//todo 리스트 가변으로 조작 시발! DB도 같이 연동

//test finish

	//memo 생성시 색상 랜덤 결정 100000~F5AAA0
	function getRandomColor() {
		return "#" + format(Math.floor((Math.random() * 15000000) + 777777).toString(16), 6);
	}

	$("#search").focusin(function() {
		$(".searchresult").css("display", "block");
	});
	//search focus기능
	$("#search").focusout(function() {
		$(".searchresult").css("display", "none");
	});
	//modal창 submit시 board추가 후 modal창 사라짐(board추가 구현필요)
	$(".sbbtn").click(function() {
		$(".modal").css("display", "none");
		boardArr[boardcnt]=generator.getNewBoard();
	});

	//modal창 임시 cancel 기능 구현
	$(".ccbtn").click(function() {
		$(".modal").css("display", "none");
	});

	//list accordion 메뉴 구현
	$(".boardlist").accordion({
		header: "div.boardli",
		heightStyle: "content",
		activate: function(event, ui) { //클릭시 보드안에 저장되있는 메모 출력
			curBoard = ui.newHeader.index() / 2;
			boardArr[curBoard].print();
		}
	});

	//첫 메모생성시 기본값 설정
	function getDefaultAttr() {
		return {
			boardid: boardArr[curBoard].boardid,
			title: "Title",
			content: "Content",
			time: getTime(),
			bgcolor: getRandomColor(),
			imageid: null,
			important: false,
			x:null,
			y:null
		};
	}
	//메모 추가 현재 노트북 화면 한계가 15개까지기 때문에 메모 수 15개로 제한
	add.click(function() {
		if (boardArr[curBoard].memocnt < 15) {
			var attr=getDefaultAttr();
			boardArr[curBoard].add(attr);
		}
	});

	//modal창 버튼에 따라 내용다르게
	edit.click(function() {
		$(".modal").css("display", "block");
		$(".formforadd").css("display", "block");
		$(".formfordelete").css("display", "none");
		$(".header > h3").html("Modify Board");
		$(".sbbtn").attr("value", "Modify");
	});
	$("#addboard").click(function() {
		$(".modal").css("display", "block");
		$(".formforadd").css("display", "block");
		$(".formfordelete").css("display", "none");
		$(".header > h3").html("Create New Board");
		$(".sbbtn").attr("value", "Create");
	});
	dboard.click(function() {
		$(".modal").css("display", "block");
		$(".formfordelete").css("display", "block");
		$(".formforadd").css("display", "none");
		$(".header > h3").html("Are You Sure Delete this Board?");
		$(".sbbtn").attr("value", "Delete");
	});

	var generator = (function() {
		//보드 생성자
		function Board(attr) {
			this.boardid = 0;
			this.boardname = attr.name;
			this.boardbgcolor = attr.color;
			this.memoArr = [];
			this.memocnt = 0;
			this.print = function() {
				$(".memo").remove();
				for (i = 0; i < this.memocnt; i++) {
					board.append(this.memoArr[i].memo);
					setMemoEvent(this.memoArr[i]);
				}
			}
			this.add = function(attr) {
				this.memoArr[this.memocnt++] = generator.getNewMemo(attr);
				board.append(this.memoArr[this.memocnt - 1].memo);
			}
		}
		//메모 생성자
		function Memo(attr) {
			this.memoid=attr.mid;
			this.boardid=attr.bid;

			// this.memo = $(document.createElement("div"));
			// this.memo.addClass("memo");

			// this.move = $(document.createElement("div"));
			// this.move.addClass("move");

			// this.option = $(document.createElement("div"));
			// this.option.addClass("option");

			// this.icon = $(document.createElement("i"));
			// this.icon.addClass("material-icons image").html("add_a_photo");

			// this.star = $(document.createElement("i"));
			// this.star.addClass("material-icons star").html("star_border");

			this.important = attr.important;

			// this.imageinput = $(document.createElement("input"));
			// this.imageinput.addClass("imageinput");

			// this.color = $(document.createElement("input"));
			// this.color.addClass("memobgcolor");

			// this.delete = $(document.createElement("i"));
			// this.delete.addClass("material-icons delete").html("delete");

			// this.option.append(this.star).append(this.icon);
			// this.option.append(this.imageinput).append(this.color);
			// this.option.append(this.delete);

			// this.title = $(document.createElement("input"));
			// this.title.addClass("title");

			// this.image = $(document.createElement("img"));
			// this.image.addClass("imagearea");
			//todo 입력받은 이미지 삽입, 이미지 클릭시 전체화면

			// this.content = $(document.createElement("textarea"));
			// this.content.addClass("content");

			// this.time = $(document.createElement("div"));
			// this.time.addClass("time");

			this.move.append(this.option);
			this.memo.append(this.move).append(this.title);
			this.memo.append($(document.createElement("hr")));
			this.memo.append(this.image).append(this.content).append(this.time);

			this.bgColor = attr.bgcolor;
			this.imageinput.attr({
				type: "file",
				name: "image",
				accept: "image/*"
			});
			this.color.attr({
				type: "color",
				name: "color",
				value: this.bgColor
			});
			this.memo.css("background", this.bgColor);
			this.title.attr("value", attr.title).css("background", this.bgColor);
			this.image.attr("src", attr.src); //임시 이미지 출력위함
			this.content.html(attr.content).css("background", this.bgColor);
			this.time.html(attr.time);
			this.x=attr.x;
			this.y=attr.y;
		}

		function setMemoEvent(curmemo) {
			//todo imageinput 이벤트 받아서 image 업로드 -> 이것도 서버
			//todo 메모 삭제 기능 -> 서버
			curmemo.delete.click(function() {});
			curmemo.star.click(function() {
				if (curmemo.important) {
					curmemo.important = false;
					curmemo.star.html("star");
				} else {
					curmemo.important = true;
					curmemo.star.html("star_border");
				}
			});
			curmemo.content.keyup(function() {
				adjustContent($(this));
			});
			curmemo.icon.click(function() {
				curmemo.imageinput.click();
			});
			curmemo.color.change(function() {   //todo sql로 연동 필요
				curmemo.bgColor = curmemo.color.val();
				console.log(curmemo.bgColor);
				curmemo.memo.css("background", curmemo.bgColor);
				curmemo.title.css("background", curmemo.bgColor);
				curmemo.content.css("background", curmemo.bgColor);
				curmemo.time.html(getTime());
			});
			curmemo.title.focusin(function() { //memo 겹쳐있을때 focus변경
				$(this.parentElement).css("z-index", 987654);
			});
			curmemo.content.focusin(function() {
				$(this.parentElement).css("z-index", 987654);
			});
			curmemo.title.focusout(function() { //title 수정 완료시 title,시간 변경
				$(this.parentElement).css("z-index", 98765);
				curmemo.time.html(getTime());
				curmemo.title.attr("value", curmemo.title.val());
			});
			curmemo.content.focusout(function() { //content 수정 완료시 content,시간 변경
				$(this.parentElement).css("z-index", 98765);
				curmemo.time.html(getTime());
				curmemo.content.html(curmemo.content.val());
			});
			curmemo.memo.mousedown().draggable({ //메모 drag 기능 추가,좌표 sql연동 필요
				handle: ".move",
				stack: ".board div",
				containment: "parent",
				scroll: false
			}).css("position", "absolute");
		}

		function adjustContent(cnt) { //textarea 높이 자동조절
			if (cnt.prop("scrollHeight") > 155) {
				cnt.css("height", "auto");
				if (cnt.prop("scrollHeight") <= 155) {
					cnt.css("height", 155);
				} else {
					cnt.css("height", cnt.prop("scrollHeight"));
				}
			}
		}
		return {
			getNewMemo: function(attr) {
				var tempmemo = new Memo(attr);
				if(!(attr.x && attr.y)) {
					setRandomPos(tempmemo);
				}
				setMemoEvent(tempmemo);
				return tempmemo; //새 메모 생성
			},
			getNewBoard: function(attr) {
				return new Board(attr);
			}
		};
	})();
	//todo 보드 추가하기, 검색, memo추가 되었을때 list도 수정하기
	//todo board 생성자에 memo 집어넣어서 구조있게 구현

	//DB 연결해서 보드 가져오기
	var firstid = 0;

	function getDatafromDB() {
		$.getJSON("./getData.jsp",{value: 0}, function(data) {
			for (i = 0; i < data.length; i++) {
				boardArr[i] = generator.getNewBoard(data[i]);
				getMemofromDB(i);
			}
		});
	}

	function getMemofromDB(index) {
			$.getJSON("./getData.jsp", { value: 1, boardid: boardArr[index].boardid }, function(data) {
				for (j = 0; j < data.length; j++) {
					boardArr[index].add(data[j]);
				}
				boardArr[0].print();
			});
	}

	//현재 html 마크업에 맞게 보드와 메모 추가5
	return {
		init: function() {
			getDatafromDB();
		}
	};
})();

window.onload = MemoManage.init();