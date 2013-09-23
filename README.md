proj1
=====

Project 1

I created this project such that the user has 4 options or startin values for cells, they can start and stop the cell growth at any time, and if they hit reset the selected value in the drop down will be represented. 


How do I  draw the board?

Using a Table: Chose not to use a table element because in similar projects in the past IT proved much more difficult than necessary. Also after brief searches on the internet it was recommended not to use this method

using divs: I chose this method because I had implemented it in the past when needing to create a board object.IT was simple to create and easy to manage. Easily created all the divs necessary and positioned them accordingly.


Should the board be infinite of finite?

finite: This was the most obvious solution. THe point of the "game" was to have a select group of cells and.

infinite: by making an infinite board it created much more computation than necessary and effected squares that did not exists, which would not have been helpful to the viewer of the game.

How to represent the board and the cells:

Array of Arrays that had dead(0) cells and alive(1) cells: I did not delve into the particulars or options for this representation. I felt that this was the obvious choice and the most common way to represent the board. IT made naming divs by the cells position on the grid simple, as well as changing and interacting with the cells. 