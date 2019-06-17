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

/* Two Functions
   1) showPage
      - This arrow function will take the list of all students and show a particular page.
      - List and page are the two parameters for the showPage function.

      The for loop iterates through each item in list by moving through its indexes.
      - let i = 0 - We declare a variable i set to 0 (the first index of the list).
      - i < list.length - The for loop will end when i is equal to the length of the list
      - i += 1 - With each iteration add 1 to i (stepping through each index)

      With each iteration:
      - let li = list[i] = declaring this local variable of li we get the item at index i
         we visit each element of list only once.
      - The lowerLimitOfPage will calculate the lowest index of the item to display on the page
         - The upperLimitOfPage will calculate the largest index of the item to display on the page
         n persons, 10 items per page
            page 1 -> 0,1,2,3,4,5,6,7,8,9 -- display
            everything else   --hide
            page 2 -> 10,11,12,13,14,15,16,17,18,19  --show
            everything else --hide
            page 3 -> 20,21,22,23,24,25,26,27,28,29  --show
            everything else --hide
            and so on...
         Determine formula for upper and lower in each possible page:
         -  lowerLimitOfPage = (page - 1) * pageIemCount
         -  we take the total page count and multiply it by page number minus one
         -  the limit of page one is zero
         -   f(1) = 0, f(2) = 10, f(3) = 20, ..., f(12) = (12-1)*10 = 110, ...
         upperLimitOfPage = (page * pageItemCount) - 1
            -  we take the total page count and multiply by page number, offset this by 1
            - g(1) = 9, g(2) = 19, g(3) = 29, ..., g(12) = (12*10) - 1 = 120 -1 = 119, ...

      - Conditional to check if i is between upperLimitOfPage and lowerLimitOfPage
         - If it is between, show the item (set display property to empty)
         - If it isn't, hide it (set display property to none)

      The if statement has a boolean logical operator of &&.
      If both expressions are true then true.
      if (i >= lowerLimitOfPage && i <= upperLimitOfPage)
*/
const showPage = (list, page) => {
   let lowerLimitOfPage = (page-1) * pageItemCount;
   let upperLimitOfPage = (page * pageItemCount) - 1;

   for (let i = 0; i < list.length; i += 1) {
       let li = list[i];
       if (i >= lowerLimitOfPage && i <= upperLimitOfPage) {
           li.style.display = ''; //display
       } else {
           li.style.display = 'none'; //hide
       }
      }
   }
showPage(studentList, 1);