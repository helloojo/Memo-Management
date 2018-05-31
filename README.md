Memo-Management
===============
>2018-1 Internet Programming Class Final Project
>-----------------------------------------------
>>## 1. Description
>>> Memo Management Website using jsp, mysql, jquery, jquery-ui
>>> It is SPA(Single Page Application)
>>## 2. Board Function
>>>### 2.1 Print Board
>>>>* Print Boardlist
>>>>* Print Memo Count
>>>>* If click Boardname Print Memolist
>>>### 2.2 Add Board
>>>>* Insert Board using user Input boardname
>>>>* Print Inserted Board in Boardlist
>>>### 2.3 Modify Board
>>>>* Insert Board using user Input boardname
>>>>* Print Modified Board in Boardlist
>>>### 2.4 Delete Board
>>>>* Delete Board
>>>>* Delete All Child Memo
>>>>* Ask User really want to delete board
>> ## 3. Memo Function
>>>### 3.1 Print Memo
>>>>* If click Boardname in Boardlist, All Memo in Board printed and Memolist printed
>>>>* Memo is Draggable
>>>>#### 3.1.1 Memo Elements
>>>>> * Title
>>>>> * Content
>>>>> * Time
>>>>>   * Time is automatically changes when Memo is modified
>>>>> * Image
>>>>> * Importance
>>>>> * ImageInput Button
>>>>> * BackgroundColor Modify Button
>>>>> * Delete Button
>>>### 3.2 Modify Memo
>>>>* Modify Memo's Title, Content, Image, BackgroundColor, Importance
>>>### 3.3 Delete Memo
>>>>* Delete Memo When clicked Memo's delete button
>>>>* Can Delete Memo in Memolist
>>>### 3.4 Search Memo
>>>>* Search Memos using SearchBar in top side
>>>>* Result will printed and highlighted user input
>>## 4. DB Setting
>>>### 4.1 Board
>>>>* boardid: INT, Primary Key, auto_increment
>>>>* boardname: VARCHAR(50)
>>>### 4.2 Memos
>>>>* memoid: INT, Primary Key, auto_increment
>>>>* boardid: INT, Foreign Key(Board.boardid)
>>>>* title: VARCHAR(40) 
>>>>* content: TEXT 
>>>>* time: VARCHAR(20) 
>>>>* bgcolor: VARCHAR(12) 
>>>>* imagepath: VARCHAR(50) 
>>>>* important: BOOLEAN 
>>>>* x: DOUBLE 
>>>>* y: DOUBLE
