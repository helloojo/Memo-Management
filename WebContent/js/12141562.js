var MemoManage = (function() {
  var board = $(".board");
  var add = $(".add");
  var edit=$(".edit");
  var dboard=$(".dboard");
  var boardli = $(".boardli");
  var boardArr = [];
  //전체 보드 저장 배열
  var boardidx = 0;
  //전체보드 수
  var curBoard = 0;
  //현재 출력중인 보드

  //메모 생성시 랜덤 위치 설정
  function setRandomPos(memo) {
    memo.offset({
      top: Math.floor(Math.random() * (board[0].clientHeight - 350)) + 50,
      left: Math.floor(Math.random() * (board[0].clientWidth - 300))
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

  //memo 생성시 색상 랜덤 결정 100000~F5AAA0
  function getRandomColor() {
    return "#" + format(Math.floor((Math.random() * 15000000) + 777777).toString(16), 6);
  }

  $("#search").focusin(function() {
    $(".searchresult").css("display","block");
  });
  //search focus기능
  $("#search").focusout(function() {
    $(".searchresult").css("display","none");
  });
  //modal창 submit시 board추가 후 modal창 사라짐(board추가 구현필요)
  $(".sbbtn").click(function() {
    $(".modal").css("display","none");
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

  //메모 추가 현재 노트북 화면 한계가 15개까지기 때문에 메모 수 15개로 제한
  add.click(function() {
    if (boardArr[curBoard].memocnt < 15) {
      boardArr[curBoard].add();
    }
  });

  //modal창 버튼에 따라 내용다르게
  edit.click(function() {
    $(".modal").css("display","block");
    $(".formforadd").css("display","block");
    $(".formfordelete").css("display","none");
    $(".header > h3").html("Modify Board");
    $(".sbbtn").attr("value","Modify");
  });
  $("#addboard").click(function() {
    $(".modal").css("display","block");
    $(".formforadd").css("display","block");
    $(".formfordelete").css("display","none");
    $(".header > h3").html("Create New Board");
    $(".sbbtn").attr("value","Create");
  });
  dboard.click(function() {
    $(".modal").css("display","block");
    $(".formfordelete").css("display","block");
    $(".formforadd").css("display","none");
    $(".header > h3").html("Are You Sure Delete this Board?");
    $(".sbbtn").attr("value","Delete");
  });


  var generator = (function() {
    //메모 생성자
    function Memo(attr) {
      this.memo = $(document.createElement("div")).addClass("memo");
      this.move = $(document.createElement("div")).addClass("move");
      this.option = $(document.createElement("div")).addClass("option");
      this.icon = $(document.createElement("i")).addClass("material-icons image").html("add_a_photo");
      this.star = $(document.createElement("i")).addClass("material-icons star").html("star_border");
      this.important = false;
      this.imageinput = $(document.createElement("input")).addClass("imageinput");
      this.color = $(document.createElement("input")).addClass("memobgcolor");
      this.delete = $(document.createElement("i")).addClass("material-icons delete").html("delete");
      this.option.append(this.star).append(this.icon).append(this.imageinput).append(this.color).append(this.delete);
      this.move.append(this.option);
      this.title = $(document.createElement("input")).addClass("title");
      this.image = $(document.createElement("img")).addClass("imagearea");
      //todo 입력받은 이미지 삽입, 이미지 클릭시 전체화면
      this.content = $(document.createElement("textarea")).addClass("content");
      this.time = $(document.createElement("div")).addClass("time");
      this.memo.append(this.move).append(this.title).append($(document.createElement("hr"))).append(this.image).append(this.content).append(this.time);
      this.move.append(this.option);
      this.bgColor = attr.color;
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
      this.image.attr("src",attr.src);      //임시 이미지 출력위함
      this.content.html(attr.content).css("background", this.bgColor);
      this.time.html(attr.time);
      setRandomPos(this.memo);
    }

    function setEvent(curmemo) {
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
      curmemo.color.change(function() {
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
      curmemo.title.focusout(function() { //memo 수정 완료시 시간 변경
        $(this.parentElement).css("z-index", 98765);
        curmemo.time.html(getTime());
        curmemo.title.attr("value",curmemo.title.val());
        alert("title: "+curmemo.title.attr("value")+"\n"+
          "content: "+curmemo.content.html()+"\n"+
          "bgColor: "+curmemo.bgColor+"\n"+
          "time: "+curmemo.time.html());
      });
      curmemo.content.focusout(function() {
        $(this.parentElement).css("z-index", 98765);
        curmemo.time.html(getTime());
        curmemo.content.html(curmemo.content.val());
        alert("title: "+curmemo.title.attr("value")+"\n"+
          "content: "+curmemo.content.html()+"\n"+
          "bgColor: "+curmemo.bgColor+"\n"+
          "time: "+curmemo.time.html());
      });
      curmemo.memo.mousedown().draggable({ //메모 drag 기능 추가
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
    //메모내용 결정
    function getAttr(attr) {
      return {
        title: "Memo " + (attr.cnt),
        content: "Content " + (attr.cnt),
        time: getTime(),
        color: attr.cr,
        src: attr.src     //임시 이미지 출력위함
      };
    }

    function Board() {
      this.memoArr = [];
      this.memocnt = 0;
      this.print = function() {
        $(".memo").remove();
        for (i = 0; i < this.memocnt; i++) {
          board.append(this.memoArr[i].memo);
          setEvent(this.memoArr[i]);
        }
      }
      this.add = function(src) {
        this.memoArr[this.memocnt++] = generator.getNewMemo(getAttr({
          cnt: this.memocnt,
          cr: getRandomColor(),
          src: src      //임시 이미지를 위함
        }));
        board.append(this.memoArr[this.memocnt - 1].memo);
      }
    }
    return {
      getNewMemo: function(attr) {
        var tempmemo = new Memo(attr);
        setEvent(tempmemo);
        return tempmemo; //새 메모 생성
      },
      getNewBoard: function() {
        return new Board();
      }
    };
  })();
  //todo 보드 추가하기, 검색, memo추가 되었을때 list도 수정하기
  //todo board 생성자에 memo 집어넣어서 구조있게 구현




  //현재 html 마크업에 맞게 보드와 메모 추가
  return {
    init: function() {
      boardArr[boardidx++] = generator.getNewBoard();
      boardArr[boardidx - 1].add("");
      boardArr[boardidx - 1].add("./image/image2.jpg");
      boardArr[boardidx - 1].add("./image/image1.jpg");
      boardArr[boardidx - 1].add("");
      boardArr[boardidx++] = generator.getNewBoard();
      boardArr[boardidx - 1].add();
      boardArr[boardidx - 1].add();
      boardArr[boardidx - 1].add();
      boardArr[boardidx++] = generator.getNewBoard();
      boardArr[boardidx - 1].add();
      boardArr[0].print();
      console.log(boardArr);
    }
  };
})();

window.onload = MemoManage.init();