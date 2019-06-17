/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*
 Two Global constant variables
  1) studentList:
     Get the studemt-list from the html page (DOM element). With this
     querySelector I am looking for any tag with the class name of student-list
     (querySelector checks for class names when input parameter begins with a period).
     Then I select only those children (every student list item in the unordered list).
  2) pageItemCount:
     I set the number of items to appear in a given page.
     10 items will appear on each page.
*/
const studentList = document.querySelector('.student-list').children;
const pageItemCount = 10;


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

//const showPage = (list, page) =>



// Remember to delete the comments that came with this file, and replace them with your own code comments.